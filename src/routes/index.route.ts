

import { Request, Response } from 'express';
import express from 'express';
import path from 'path';
import fs from 'fs';

const extensions = ['.ts', '.js'];
const route: express.Router = express.Router();

export default () => {
    route.get('/', async (req: Request, res: Response) => {
        return res.status(200).send({
            message: 'API em Node.js | Desafio South System'
        })
    })

    fs.readdirSync(__dirname).filter((file) => {
        return (
            (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (extensions.includes(file.slice(-3)))
        )
    }).forEach((file) => {
        const fileRoute = require(path.join(__dirname, file));
        route.use(fileRoute.default());
    });

    return route;
}
