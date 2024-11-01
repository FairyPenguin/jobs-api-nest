import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignsModule } from './app/modules/signs/signs.module';
import { PrismaModule } from './app/modules/prisma/prisma/prisma.module';

@Module({
  imports: [SignsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
