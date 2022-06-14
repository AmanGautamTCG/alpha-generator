import createError from 'http-errors';
import {Application, Request, Response, NextFunction} from 'express';
import {logger} from "../logging/logger";
import {ResponseCode} from "../builders/responseSender";

export const initErrorHandlers = (app: Application) => {
    logger.info('initErrorHandlers');
    // catch 404 and forward to error handler
    app.use(function (req: Request, res: Response, next: NextFunction) {
        next(createError(ResponseCode.NOT_FOUND));
    });

    // error handler
    app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        //res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.locals.error = err;
        // render the error page
        res.status(err.status || ResponseCode.INTERNAL_SERVER_ERROR);
        res.render('error');
    });

    process.on('uncaughtException', (error, origin) => {
        logger.error(`[Uncaught Exception] => Error: ${error} => Origin: ${origin}`);
    });

    process.on('unhandledRejection', (reason, promise) => {
        logger.error(`[Uncaught Rejection] => at: ${promise} => Reason: ${origin}`);
    });
};
