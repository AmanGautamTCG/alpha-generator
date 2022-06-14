"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initExpress = void 0;
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const morgan_body_1 = __importDefault(require("morgan-body"));
const logger_1 = require("../logging/logger");
const initExpress = (app, express) => {
    logger_1.logger.info('initExpress');
    app.set('views', path_1.default.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.use((0, morgan_1.default)('debug'));
    app.use((0, compression_1.default)());
    app.use((0, cookie_parser_1.default)());
    (0, morgan_body_1.default)(app, { maxBodyLength: 10000, logAllReqHeader: false, noColors: true });
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path_1.default.join(__dirname, 'public')));
};
exports.initExpress = initExpress;
