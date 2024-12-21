import * as fs from 'fs';

// function getDatabaseURL(): string {

//     const password = fs.readFileSync('/run/secrets/db-password', 'utf8').trim();

//     // postgresql://postgres:11@localhost:5432/nestjsdatabase?schema=public

//     const URL = `postgresql://${process.env.POSTGRES_USER}:${password}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}?sslmode=${process.env.POSTGRES_SSLMODE}`

//     return URL
// }


export function dataBaseInit() {
    // Read the database password from the secret file
    // const dbPassword = fs.readFileSync('/run/secrets/database-password', 'utf8').trim();
    process.env.DATABASE_URL = `postgresql://postgres:112233@database:5432/nestdatabase`;

    // Now Prisma will use this DATABASE_URL when it initializes
}
