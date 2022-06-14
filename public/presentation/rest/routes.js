"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatorsRouter = exports.indexRouter = void 0;
const index_route_1 = __importDefault(require("./index/index.route"));
exports.indexRouter = index_route_1.default;
const generator_route_1 = __importDefault(require("./generator/generator.route"));
exports.generatorsRouter = generator_route_1.default;
