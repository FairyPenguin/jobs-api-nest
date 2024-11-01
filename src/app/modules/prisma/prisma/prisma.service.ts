import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    onModuleInit() {
        this.$connect()
            .then(() => console.log("Database Connected Successfully 🎉 🎊"))
            .catch((error) => console.log("❌ Error, failed connectign to the DB: \n", error))
    }
}
