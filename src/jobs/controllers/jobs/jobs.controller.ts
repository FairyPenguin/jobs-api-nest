import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Query,
  Param,
  Res,
  RawBodyRequest,
  UsePipes,
  ValidationPipe,
  Response,
} from '@nestjs/common';

import { CreateJobDto } from 'src/jobs/dtos/CreateJob.dto';
import { JobsService } from 'src/jobs/services/jobs/jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobService: JobsService) {}
  /**
   *
   *
   *  */
  @Get('list')
  getJobsList() {
    return ['Jobs List'];
  }

  /**
   *
   */

  @Get(':id')
  getJobById() {
    return 'Job';
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
  deleteSingleJob() {
    return '55';
  }

  /**
   *
   */

  @Put(':id')
  updateJob() {
    return 'Updated';
  }
}
