import * as bcrypt from 'bcrypt';
import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { TokensService } from '@/tokens/tokens.service';
import { TokensType } from '@/types/tokens.type';
import { PrismaService } from '@/prisma/prisma.service';
@Injectable()
export class AuthenticationService {
  constructor(
    private readonly user: UserService,
    private readonly tokens: TokensService,
    private readonly prisma: PrismaService
  ) { }

  async registration({ name, surname, email, password }: RegistrationDto): Promise<TokensType> {

    const hashPassword = await bcrypt.hash(password, 8);

    const newUser = await this.user.create({ name, surname, email, password: hashPassword });

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
    };

    return await this.tokens.generateTokens(payload);
  }

  async login({ email, password }: LoginDto) {

    const findUser = await this.user.findOneByEmail(email);
    if (!findUser) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'Такого користувача не існує.'
      });
    }

    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (!checkPassword) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        message: "Невірний пароль."
      });
    }

    const payload = {
      id: findUser.id,
      avatar: findUser.avatar,
      name: findUser.name,
      surname: findUser.surname,
      email: findUser.email,
      activatedLink: findUser.activatedLink,
      rule: findUser.rule,
      updated_at: findUser.updated_at,
      created_at: findUser.created_at,
    };

    const { access_token, refresh_token } = await this.tokens.generateTokens(payload);

    await this.prisma.session.create({
      data: {
        userId: findUser.id,
        device: 'PC',
        session: refresh_token
      }
    })

    return { access_token, refresh_token };
  }

  async refresh(token: string) {
    const userData = await this.tokens.checkValidToken(token);
    const tokenFromDb = await this.tokens.findTokenInTheDB(token);

    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException();
    }

    const findUser = await this.user.findUserById(userData.id);
    if (!findUser) {
      throw new UnauthorizedException();
    }

    const { password, ...payload } = findUser;

    const generateTokens = await this.tokens.generateTokens(payload);

    const tokens = await this.tokens.saveToken(findUser.id, generateTokens.refresh_token);

    return { ...tokens, user: payload };
  }

}
