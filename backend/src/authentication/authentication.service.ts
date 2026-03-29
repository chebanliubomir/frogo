import * as bcrypt from 'bcrypt';
import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { TokensService } from '@/tokens/tokens.service';
import { TokensType } from '@/types/tokens.type';
@Injectable()
export class AuthenticationService {
  constructor(
    private readonly user: UserService,
    private readonly tokens: TokensService
  ) {}

  async registration({name, surname, email, password}: RegistrationDto): Promise<TokensType> {

    const hashPassword = await bcrypt.hash(password, 8)

    const newUser = await this.user.create({ name, surname, email, password: hashPassword })

    // This needs to be changed to entity strategy
    const payload = {
      id: newUser.id,
      avatar: newUser.avatar,
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      activatedLink: newUser.activatedLink,
      rule: newUser.rule,
      updated_at: newUser.updated_at,
      created_at: newUser.created_at,
    }

    return await this.tokens.generateTokens(payload)
  }

  async login({email, password}: LoginDto) {

    const findUser = await this.user.findOne(email)
    if(!findUser) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Такого користувача не існує.'
      })
    }

    const checkPassword = await bcrypt.compare(password, findUser.password)
    if(!checkPassword) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        message: "Невірний пароль."
      })
    }
    
    return checkPassword
  }

  // resetPassword() {}

  // confirmAccount() {}

  // logout() {}

}
