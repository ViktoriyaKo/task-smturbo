import { Controller, Get } from '@nestjs/common';

@Controller()
export class ServerController {
  @Get('/')
  getHello(): string {
    return 'Server has started';
  }
}
