import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('data')
  async getData(): Promise<any[]> {
    try {
      return await this.appService.getData();
    } catch (e) {
      return [];
    }
  }
}
