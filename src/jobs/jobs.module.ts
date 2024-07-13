import { Module } from '@nestjs/common';
import { JobsController } from './controllers/jobs/jobs.controller';
import { JobsService } from './services/jobs/jobs/jobs.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
