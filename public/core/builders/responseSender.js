"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = exports.ResponseSender = void 0;
class ResponseSender {
    static data(res, data, message, event, success, responseCode, statusCode) {
        return res
            .status(responseCode !== null && responseCode !== void 0 ? responseCode : 200)
            .header({ "timestamp": Date.now(), })
            .send({
            success: success !== null && success !== void 0 ? success : true,
            message: message,
            data: data,
            statusCode: statusCode,
            event: event,
        });
    }
    static message(res, message, data, event, success, responseCode, statusCode) {
        return res
            .status(responseCode !== null && responseCode !== void 0 ? responseCode : 200)
            .header({ "timestamp": Date.now(), })
            .send({
            success: success !== null && success !== void 0 ? success : true,
            message: message,
            data: data,
            statusCode: statusCode,
            event: event,
        });
    }
    static error(res, message, data, event, success, responseCode, statusCode) {
        return res
            .status(responseCode !== null && responseCode !== void 0 ? responseCode : 500)
            .header({ "timestamp": Date.now(), })
            .send({
            success: success !== null && success !== void 0 ? success : false,
            message: message !== null && message !== void 0 ? message : "SERVER_ERROR",
            data: data,
            statusCode: statusCode,
            event: event,
        });
    }
    static validationError(res, message, data, event, success, responseCode, statusCode) {
        return res
            .status(responseCode !== null && responseCode !== void 0 ? responseCode : 400)
            .header({ "timestamp": Date.now(), })
            .send({
            success: success !== null && success !== void 0 ? success : false,
            message: message !== null && message !== void 0 ? message : "BAD_REQUEST",
            data: data,
            statusCode: statusCode,
            event: event,
        });
    }
    static badRequest(res, message, data, event, success, responseCode, statusCode) {
        return res
            .status(responseCode !== null && responseCode !== void 0 ? responseCode : 400)
            .header({ "timestamp": Date.now(), })
            .send({
            success: success !== null && success !== void 0 ? success : false,
            message: message !== null && message !== void 0 ? message : "BAD_REQUEST",
            data: data,
            statusCode: statusCode,
            event: event,
        });
    }
    static notFound(res, message, data, event, success, responseCode, statusCode) {
        return res
            .status(responseCode !== null && responseCode !== void 0 ? responseCode : 404)
            .header({ "timestamp": Date.now(), })
            .send({
            success: success !== null && success !== void 0 ? success : false,
            message: message !== null && message !== void 0 ? message : "NO_ENTRIES_FOUND",
            data: data,
            statusCode: statusCode,
            event: event,
        });
    }
    static forbidden(res, message, data, event, success, responseCode, statusCode) {
        return res
            .status(responseCode !== null && responseCode !== void 0 ? responseCode : 403)
            .header({ "timestamp": Date.now(), })
            .send({
            success: success !== null && success !== void 0 ? success : false,
            message: message !== null && message !== void 0 ? message : "FORBIDDEN",
            data: data,
            statusCode: statusCode !== null && statusCode !== void 0 ? statusCode : 403,
            event: event,
        });
    }
    static unauthorized(res, message, data, event, success, responseCode, statusCode) {
        return res
            .status(responseCode !== null && responseCode !== void 0 ? responseCode : 401)
            .header({ "timestamp": Date.now(), })
            .send({
            success: success !== null && success !== void 0 ? success : false,
            message: message !== null && message !== void 0 ? message : "UNAUTHORIZED",
            data: data,
            statusCode: statusCode !== null && statusCode !== void 0 ? statusCode : 401,
            event: event,
        });
    }
    static unavailable(res, message, data, event, success, responseCode, statusCode) {
        return res
            .status(responseCode !== null && responseCode !== void 0 ? responseCode : 500)
            .header({ "timestamp": Date.now(), })
            .send({
            success: success !== null && success !== void 0 ? success : false,
            message: message !== null && message !== void 0 ? message : "SERVER_ERROR",
            data: data,
            statusCode: statusCode,
            event: event,
        });
    }
    static unexpected(res, message, data, event, success, responseCode, statusCode) {
        return res
            .status(responseCode !== null && responseCode !== void 0 ? responseCode : 503)
            .header({ "timestamp": Date.now(), })
            .send({
            success: success !== null && success !== void 0 ? success : false,
            message: message !== null && message !== void 0 ? message : "UNEXPECTED_ERROR",
            data: data,
            statusCode: statusCode,
            event: event,
        });
    }
}
exports.ResponseSender = ResponseSender;
const response = function (res, code, msg, error) {
    return res
        .status(code)
        .header({ "timestamp": Date.now() })
        .send(msg);
};
exports.response = response;
