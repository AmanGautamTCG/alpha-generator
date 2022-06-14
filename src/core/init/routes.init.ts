import {Application} from 'express';
import * as route from '../../presentation/rest/routes';
import {logger} from "../logging/logger";

export const initRoutes = (app: Application) => {
    logger.info('initRoutes');
    app.use('/generators', route.generatorsRouter);
};
