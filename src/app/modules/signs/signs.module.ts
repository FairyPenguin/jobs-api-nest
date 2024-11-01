import { Module } from '@nestjs/common';
import { SignsService } from './signs.service';
import { SignsController } from './signs.controller';
import { PrismaModule } from '../prisma/prisma/prisma.module';

@Module({
  controllers: [SignsController],
  providers: [SignsService],
  imports: [PrismaModule]
})
export class SignsModule { }
