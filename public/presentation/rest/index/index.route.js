"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const index_service_1 = require("../../../domain/rest/index/index.service");
router.get('/', index_service_1.index);
exports.default = router;
