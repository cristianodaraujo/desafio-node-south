
import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';

const extensions = ['.ts', '.js'];
const route: express.Router = express.Router();

export default () => {
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
