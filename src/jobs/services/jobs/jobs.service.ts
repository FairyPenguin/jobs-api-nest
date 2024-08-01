import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Prisma } from '@prisma/client';
import { CreateJobDto } from 'src/jobs/dtos/CreateJob.dto';
import { UpdateJobDto } from 'src/jobs/dtos/UpdateJob.dto';

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

  deleteJobById(id: number) {
    return this.prisma.job.delete({
      where: { id: id },
    });
  }

  getJobById(id: number) {
    const user = this.prisma.job.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw new HttpException('Job not found, Check the id again', 404);
    }
    return user;
  }

  async updateJobById(id: number, data: UpdateJobDto) {
    const checkJobExisting = await this.getJobById(id);

    if (!checkJobExisting) {
      throw new HttpException('Job not found', 404);
    }
    // You could also check the data ot self after cheking the object is exsit,
    //  Like name is used ,  email is used

    return this.prisma.job.update({
      where: { id: id },
      data: data,
    });
  }
}
