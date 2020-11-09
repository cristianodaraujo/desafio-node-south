import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import * as createError from 'http-errors';
import * as express from 'express';
// import * as cors from 'cors';

const app: express.Application = express();

export default (route: express.Router) => {
    // app.use(cors());
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({
        limit: '50mb',
        extended: true
    }));

    app.use(route);

    // 404 handler && pass to error handler
    app.use((req: Req, res: Res, next: Next) => {
        next(createError(404, 'Not found'));
    });

    // Error handler
    app.use((err: createError.HttpError, req: Req, res: Res, next: Next) => {
        res.status(err.status || 500);
        res.send({
            error: {
                status: err.status || 500,
                message: err.message
            }
        });
    });

    app.listen(process.env.PORT || 3000, () => {
        console.log('Server started...');
    });

    return app;
}