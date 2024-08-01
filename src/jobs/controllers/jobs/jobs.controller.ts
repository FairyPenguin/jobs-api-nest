import {
  Controller,
  Delete,
  Get,
  Post,
  Body,
  Query,
  Param,
  Res,
  UsePipes,
  ValidationPipe,
  Response,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';

import { CreateJobDto } from 'src/jobs/dtos/CreateJob.dto';
import { UpdateJobDto } from 'src/jobs/dtos/UpdateJob.dto';
import { JobsService } from 'src/jobs/services/jobs/jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobService: JobsService) { }
  /**
   *
   *
   *  */
  @Get('list')
  getJobsList() {
    return this.jobService.getJobsList();
  }

  /**
   *
   */

  @Get(':id')
  getJobById(@Param('id', ParseIntPipe) id: number) {
    return this.jobService.getJobById(id);
  }

  /**
   *
   */

  @Post('create')
  @UsePipes(ValidationPipe)
  createNewJob(@Body() createjobDto: CreateJobDto) {
    return this.jobService.createJob(createjobDto);
  }

  /**
   *
   */
  @Delete(':id')
  deleteSingleJob(@Param('id', ParseIntPipe) id: number) {
    return this.jobService.deleteJobById(id);
  }

  /**
   * ==> >= <= === !=
   */

  @Patch(':id')
  updateJob(
    @Body() UpdateJobDto: UpdateJobDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.jobService.updateJobById(id, UpdateJobDto);
  }
}
