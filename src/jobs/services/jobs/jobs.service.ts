import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  createJob(data: Prisma.JobCreateManyInput) {
    const job = this.prisma.job.create({
      data,
    });
    return job;
  }
}
