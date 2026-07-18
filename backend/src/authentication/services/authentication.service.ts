import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { Token } from '@prisma/generated'
import * as bcrypt from 'bcrypt'
import uuid from 'uuid'

import { UserService } from '../../user/user.service'
import { LoginDto } from '../dto/login.dto'
import { RegistrationDto } from '../dto/registration.dto'

import { MailService } from '@/mail/mail.service'
import { TokensService } from '@/tokens/tokens.service'
import { Tokens } from '@/tokens/intarfaces/tokens.intarface'
import { AuthenticationEntity } from '../entities/authentication.entity'
import { instanceToPlain } from 'class-transformer'


@Injectable()
export class AuthenticationService {
  constructor(
    private readonly user: UserService,
    private readonly token: TokensService,
    private readonly mailService: MailService
  ) { }

  async registration({ name, surname, email, password }: RegistrationDto): Promise<Tokens> {
    const findUser = await this.user.findUserEmail(email)
    if (findUser) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        message: 'Такий користувач вже існує.'
      })
    }

    const hashPassword = await bcrypt.hash(password, 8)

    const activatedLink = uuid.v4()

    const newUser = await this.user.create({ name, surname, email, password: hashPassword, activatedLink })

    await this.mailService.sendMail({
      to: newUser.email,
      subject: 'Activate account',
      html: `
      <a href="${process.env.SERVER_URL}api/activate/${activatedLink}">
        <button>activate account</button>
      </a>`
    })


    const payload = new AuthenticationEntity(newUser)
    const { access_token, refresh_token } = await this.token.generateTokens(instanceToPlain(payload))

    await this.token.saveToken(newUser.id, refresh_token)

    return { access_token, refresh_token }

  }

  async login({ email, password }: LoginDto): Promise<Tokens> {
    const findUser = await this.user.findUserEmail(email)
    if (!findUser) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'This user does not exist.'
      })
    }

    const checkPassword = await bcrypt.compare(password, findUser.password)
    if (!checkPassword) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invali password.'
      })
    }

    const payload = new AuthenticationEntity(findUser)
    const { access_token, refresh_token } = await this.token.generateTokens(instanceToPlain(payload))

    await this.token.saveToken(findUser.id, refresh_token)

    return { access_token, refresh_token }
  }

  async refresh(refreshToken: string): Promise<Tokens> {
    if (!refreshToken) {
      throw new UnauthorizedException({ message: 'User is not authorized' })
    }

    const userData = await this.token.validateRefreshToken(refreshToken)
    const tokenFromDb = await this.token.searchingTokenInDataBase(refreshToken)

    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException({ message: 'User is not authorized' })
    }

    const findUser = await this.user.findUserId(userData.id)
    if (!findUser) {
      throw new UnauthorizedException({ message: 'User is not authorized' })
    }

    const payload = new AuthenticationEntity(findUser)
    const { access_token, refresh_token } = await this.token.generateTokens(instanceToPlain(payload))

    await this.token.saveToken(findUser.id, refresh_token)

    return { access_token, refresh_token }
  }

  async logout(refreshToken: string): Promise<Token | null> {
    return await this.token.removeToken(refreshToken)
  }

}
