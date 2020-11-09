import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const connect = () => {
    return mongoose.connect(process.env.MONGODB_URI, {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
}

const close = () => {
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('A conexão do Mongoose foi desconectada.');
            process.exit(0);
        });
    })
}

export default {
    connect,
    close
}