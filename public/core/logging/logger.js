"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
exports.logger = (0, winston_1.createLogger)({
    level: 'debug',
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.splat(), winston_1.format.simple()),
    transports: [
        new winston_1.transports.Console(),
    ]
});
