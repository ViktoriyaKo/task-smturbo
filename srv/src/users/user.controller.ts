import { UserService } from './users.service';
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UsersResponseDto } from './users.response.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 20) {
    this.logger.log(`Get users page ${page} with limit ${limit}`);
    const { users, total } = await this.userService.findAll(page, limit);
    return {
      users: users.map((user) => UsersResponseDto.fromUsersEntity(user)),
      total,
    };
  }
}
