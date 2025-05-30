import pkg from 'pg'
import { configDotenv } from 'dotenv';
configDotenv();

const { Pool } = pkg; // ---> ใช้กับ ES Modules : config น้อยดีกว่า

const db = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})

db.on('error', (err) => {
    console.log('Unexpected error on database client', err);
    process.exit(-1);
})

export default db