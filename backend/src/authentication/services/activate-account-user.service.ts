import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class ActivateAccountUserService {
  constructor(
    private readonly user: UserService,
  ) { }

  async activate(link: string): Promise<string> {
    const user = await this.user.findUserActivatedLink(link);
    if (!user) {
      throw new BadRequestException();
    }

    await this.user.activate(link);

    return 'Your account was activated.';
  }

}
