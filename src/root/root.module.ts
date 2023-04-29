import { Module } from '@nestjs/common';
import { RootController } from './controller/root.controller';
import { RootService } from './service/root.service';

@Module({
  imports: [],
  controllers: [RootController],
  providers: [RootService],
})
export class RootModule {}
