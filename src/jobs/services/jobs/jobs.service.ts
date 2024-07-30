import { HttpException, Injectable } from '@nestjs/common';
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

  getJobsList() {
    const jobsList = this.prisma.job.findMany();
    return jobsList;
  }

  async getJobById(id: number) {
    const user = await this.prisma.job.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw new HttpException('User not found, Check the id again', 404);
    }
    return user;
  }
}
