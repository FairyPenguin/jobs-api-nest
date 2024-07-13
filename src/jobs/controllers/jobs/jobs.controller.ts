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
} from '@nestjs/common';

import { Response } from 'express';
import { JobsService } from 'src/jobs/services/jobs/jobs/jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobs: JobsService) {}
  /**
   *
   *
   *  */
  @Get('jobs/list')
  getJobsList() {
    return ['Jobs List'];
  }

  /**
   *
   */

  @Get('/jobs/:id')
  getJobById() {
    return 'Job';
  }

  /**
   *
   */

  @Post('jobs/create')
  createNewJob() {
    return 'C S ';
  }

  /**
   *
   */
  @Delete('jobs/:id')
  deleteSingleJob() {
    return '55';
  }

  /**
   *
   */

  @Put('jobs/:id')
  updateJob() {
    return 'Updated';
  }
}
