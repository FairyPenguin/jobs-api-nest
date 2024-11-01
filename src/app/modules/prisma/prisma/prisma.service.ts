import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { dataBaseInit } from '../url';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    onModuleInit() {

        dataBaseInit()

        this.$connect()
            .then(() => console.log("Database Connected Successfully 🎉 🎊"))
            .catch((error) => console.log("❌ Error, failed connecting to the DB: \n \n", error))
    }
}
