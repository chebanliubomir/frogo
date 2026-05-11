import * as bcrypt from 'bcrypt';
import uuid from 'uuid';
import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { TokensService } from '@/tokens/tokens.service';
import { TokensType } from '@/types/tokens.type';
import { MailService } from '@/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/prisma/prisma.service';
import { FindUserEnum } from '@/user/enums/find-user.enum';
import { Session } from '@prisma/generated';
@Injectable()
export class AuthenticationService {
  constructor(
    private readonly user: UserService,
    private readonly token: TokensService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly prisma: PrismaService
  ) { }

  async registration({ name, surname, email, password }: RegistrationDto): Promise<TokensType> {
    const findUser = await this.user.find(email, FindUserEnum.EMAIL);
    if (findUser) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        message: 'Такий користувач вже існує.'
      });
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const activatedLink = uuid.v4();

    const newUser = await this.user.create({ name, surname, email, password: hashPassword, activatedLink });

    await this.mailService.sendMail({
      to: newUser.email,
      subject: 'Activate account',
      html: `${this.configService.get('common.server_url')}api/activate/${activatedLink}`
    });

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

    const { access_token, refresh_token } = await this.token.generateTokens(payload);

    await this.token.saveToken(newUser.id, refresh_token);

    return { access_token, refresh_token };

  }

  async login({ email, password }: LoginDto): Promise<TokensType> {

    const findUser = await this.user.find(email, FindUserEnum.EMAIL);
    if (!findUser) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: 'This user does not exist.'
      });
    }

    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (!checkPassword) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        message: "Invali password."
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

    const { access_token, refresh_token } = await this.token.generateTokens(payload);

    await this.token.saveToken(findUser.id, refresh_token);

    return { access_token, refresh_token };
  }

  async resetPassword(email: string): Promise<string> {
    const user = await this.user.find(email, FindUserEnum.EMAIL);
    if (!user) {
      throw new BadRequestException('User not found.');
    }

    const resetPasswordLink = uuid.v4();

    await this.prisma.user.update({
      where: { email },
      data: { resetPasswordLink }
    });

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Reset Password',
      html: `${this.configService.get('common.server_url')}api/authentication/reset-password/${resetPasswordLink}`
    });

    return `Letter send to ${user.email}.`;

  }

  async resetPasswordLink(link: string) {
    return link;
  }

  async activate(link: string): Promise<string> {
    const user = await this.user.find(link, FindUserEnum.ACTIVATED_LINK);
    if (!user) {
      throw new BadRequestException();
    }

    await this.user.activate(link);

    return 'Your account was activated.'
  }

  async refresh(refreshToken: string): Promise<TokensType> {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const userData = await this.token.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.token.searchingTokenInDataBase(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new UnauthorizedException();
    }

    const findUser = await this.user.find(userData.id, FindUserEnum.ID);
    if (!findUser) {
      throw new UnauthorizedException();
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

    const { access_token, refresh_token } = await this.token.generateTokens(payload);

    await this.token.saveToken(findUser.id, refresh_token);

    return { access_token, refresh_token };
  }

  async logout(refreshToken: string): Promise<Session | null> {
    return await this.token.removeToken(refreshToken);
  }

}
