import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

    dataBaseInit() {
        // Read the database password from the secret file
        // const dbPassword = fs.readFileSync('/run/secrets/database-password', 'utf8').trim();
        process.env.DATABASE_URL = `postgresql://postgres:112233@database:5432/nest`;

        // Now Prisma will use this DATABASE_URL when it initializes
    }

    onModuleInit() {

        this.dataBaseInit()

        this.$connect()
            .then(() => console.log("Database Connected Successfully 🎉 🎊"))
            .catch((error) => console.log("❌ Error, failed connecting to the DB: \n \n", error))
    }
}
