import {Server} from 'http';
import express, {Application} from 'express';
import {config} from 'dotenv';
import {initExpress} from './core/init/express.init';
import {initErrorHandlers} from './core/init/error.handlers.init';
import {initRoutes} from './core/init/routes.init';
import {logger} from "./core/logging/logger";

config();
const app: Application = express();

let server: Server;

initExpress(app, express);
initRoutes(app);
initErrorHandlers(app);
server = app.listen(6000, () => logger.info('Generator Server is running'));

export {
    app,
}
