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
  ParseIntPipe,
} from '@nestjs/common';

import { CreateJobDto } from 'src/jobs/dtos/CreateJob.dto';
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
  deleteSingleJob() {
    return '55';
  }

  /**
   * ==> >= <= === !=
   */

  @Put(':id')
  updateJob() {
    return 'Updated';
  }
}
