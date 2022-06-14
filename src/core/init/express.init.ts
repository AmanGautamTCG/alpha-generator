import path from 'path';
import {Application} from 'express';
import cookieParser from 'cookie-parser';
import logging from 'morgan';
import compression from 'compression';
import morganBody from 'morgan-body';
import {logger} from "../logging/logger";

export const initExpress = (app: Application, express: any) => {

    logger.info('initExpress');
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.use(logging('debug'));
    app.use(compression());
    app.use(cookieParser());
    morganBody(app, {maxBodyLength: 10000, logAllReqHeader: false, noColors: true});
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname, 'public')));
};
