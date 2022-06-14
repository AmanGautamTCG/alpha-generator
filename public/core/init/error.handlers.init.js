"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initErrorHandlers = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const logger_1 = require("../logging/logger");
const initErrorHandlers = (app) => {
    logger_1.logger.info('initErrorHandlers');
    app.use(function (req, res, next) {
        next((0, http_errors_1.default)(404));
    });
    app.use(function (err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = err;
        res.status(err.status || 500);
        res.render('error');
    });
    process.on('uncaughtException', (error, origin) => {
        logger_1.logger.error(`[Uncaught Exception] => Error: ${error} => Origin: ${origin}`);
    });
    process.on('unhandledRejection', (reason, promise) => {
        logger_1.logger.error(`[Uncaught Rejection] => at: ${promise} => Reason: ${origin}`);
    });
};
exports.initErrorHandlers = initErrorHandlers;
