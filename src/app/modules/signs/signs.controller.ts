import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignsService } from './signs.service';
import { CreateSignDto } from './dto/create-sign.dto';
import { UpdateSignDto } from './dto/update-sign.dto';

@Controller('signs')
export class SignsController {
  constructor(private readonly signsService: SignsService) { }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createSignDto: CreateSignDto) {
    return this.signsService.create(createSignDto);
  }

  @Get()
  findAll() {
    return this.signsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSignDto: UpdateSignDto) {
    return this.signsService.update(+id, updateSignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signsService.remove(+id);
  }
}
