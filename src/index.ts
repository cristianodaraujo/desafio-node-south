import Database from './config/db.config';
import AppConfig from './config/app.config';
import InitRoutes from './routes/index.route';

import dotenv from 'dotenv';

dotenv.config();

(async () => {
    try {
        await Database.connect().then(() => {
            console.log('Mongodb conectado.');
            AppConfig(InitRoutes());
        }).catch(err => console.log(err.message));

        await Database.close();
    } catch (error) {
        console.error('Ocorreu algum erro na conexão com o banco.', error);
    }
})();
