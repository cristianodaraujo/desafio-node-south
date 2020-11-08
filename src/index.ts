import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import AppConfig from '@config/app.config';
import InitRoutes from '@routes/index.route';

dotenv.config();

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }).then(() => {
            console.log('Mongodb conectado.');
            AppConfig(InitRoutes());
        }).catch(err => console.log(err.message));

        await process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log('A conexão do Mongoose foi desconectada.');
                process.exit(0);
            });
        });
    } catch (error) {
        console.error('Ocorreu algum erro na conexão com o banco.', error);
    }
})();
