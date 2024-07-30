import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateJobDto } from 'src/jobs/dtos/CreateJob.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) { }

  createJob(data: CreateJobDto) {
    const job = this.prisma.job.create({
      data,
    });
    return job;
  }

  getUsers() {
    return [];
  }

  getUserById() { }
}
