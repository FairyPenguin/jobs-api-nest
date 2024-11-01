import { Injectable } from '@nestjs/common';
import { CreateSignDto } from './dto/create-sign.dto';
import { UpdateSignDto } from './dto/update-sign.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class SignsService {

  constructor(private prisma: PrismaService) { }

  create(newSign: CreateSignDto) {

    const createNewSign = this.prisma.sign.create({
      data: {
        title: newSign.title
      }
    })

    return createNewSign

  }

  findAll() {
    const signsList = this.prisma.sign.findMany()
    return signsList;
  }

  findOne(id: number) {
    return `This action returns a #${id} sign`;
  }

  update(id: number, updateSignDto: UpdateSignDto) {
    return `This action updates a #${id} sign`;
  }

  remove(id: number) {
    return `This action removes a #${id} sign`;
  }
}
