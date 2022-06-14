import {Response} from "express";

export class ResponseSender {
    static data(res: Response, data?: any, message?: string, event?: Event, success?: boolean, responseCode?: ResponseCode, statusCode?: StatusCode) {
        return res
            .status(responseCode ?? ResponseCode.OK)
            .header({"timestamp": Date.now(),})
            .send({
                success: success ?? true,
                message: message,
                data: data,
                statusCode: statusCode,
                event: event,
            });
    }

    static message(res: Response, message?: string, data?: any, event?: Event, success?: boolean, responseCode?: ResponseCode, statusCode?: StatusCode) {
        return res
            .status(responseCode ?? ResponseCode.OK)
            .header({"timestamp": Date.now(),})
            .send({
                success: success ?? true,
                message: message,
                data: data,
                statusCode: statusCode,
                event: event,
            });
    }

    static error(res: Response, message?: string, data?: any, event?: Event, success?: boolean, responseCode?: ResponseCode, statusCode?: StatusCode) {
        return res
            .status(responseCode ?? ResponseCode.INTERNAL_SERVER_ERROR)
            .header({"timestamp": Date.now(),})
            .send({
                success: success ?? false,
                message: message ?? ResponseMessage.SERVER_ERROR,
                data: data,
                statusCode: statusCode,
                event: event,
            });
    }


    static validationError(res: Response, message?: string, data?: any, event?: Event, success?: boolean, responseCode?: ResponseCode, statusCode?: StatusCode) {
        return res
            .status(responseCode ?? ResponseCode.BAD_REQUEST)
            .header({"timestamp": Date.now(),})
            .send({
                success: success ?? false,
                message: message ?? ResponseMessage.BAD_REQUEST,
                data: data,
                statusCode: statusCode,
                event: event,
            });
    }

    static badRequest(res: Response, message?: string, data?: any, event?: Event, success?: boolean, responseCode?: ResponseCode, statusCode?: StatusCode) {
        return res
            .status(responseCode ?? ResponseCode.BAD_REQUEST)
            .header({"timestamp": Date.now(),})
            .send({
                success: success ?? false,
                message: message ?? ResponseMessage.BAD_REQUEST,
                data: data,
                statusCode: statusCode,
                event: event,
            });
    }

    static notFound(res: Response, message?: string, data?: any, event?: Event, success?: boolean, responseCode?: ResponseCode, statusCode?: StatusCode) {
        return res
            .status(responseCode ?? ResponseCode.NOT_FOUND)
            .header({"timestamp": Date.now(),})
            .send({
                success: success ?? false,
                message: message ?? ResponseMessage.NO_ENTRIES_FOUND,
                data: data,
                statusCode: statusCode,
                event: event,
            });
    }

    static forbidden(res: Response, message?: string, data?: any, event?: Event, success?: boolean, responseCode?: ResponseCode, statusCode?: StatusCode) {
        return res
            .status(responseCode ?? ResponseCode.FORBIDDEN)
            .header({"timestamp": Date.now(),})
            .send({
                success: success ?? false,
                message: message ?? ResponseMessage.FORBIDDEN,
                data: data,
                statusCode: statusCode ?? ResponseCode.FORBIDDEN,
                event: event,
            });
    }

    static unauthorized(res: Response, message?: string, data?: any, event?: Event, success?: boolean, responseCode?: ResponseCode, statusCode?: StatusCode) {
        return res
            .status(responseCode ?? ResponseCode.UNAUTHORIZED)
            .header({"timestamp": Date.now(),})
            .send({
                success: success ?? false,
                message: message ?? ResponseMessage.UNAUTHORIZED,
                data: data,
                statusCode: statusCode ?? ResponseCode.UNAUTHORIZED,
                event: event,
            });
    }

    static unavailable(res: Response, message?: string, data?: any, event?: Event, success?: boolean, responseCode?: ResponseCode, statusCode?: StatusCode) {
        return res
            .status(responseCode ?? ResponseCode.INTERNAL_SERVER_ERROR)
            .header({"timestamp": Date.now(),})
            .send({
                success: success ?? false,
                message: message ?? ResponseMessage.SERVER_ERROR,
                data: data,
                statusCode: statusCode,
                event: event,
            });
    }

    static unexpected(res: Response, message?: string, data?: any, event?: Event, success?: boolean, responseCode?: ResponseCode, statusCode?: StatusCode) {
        return res
            .status(responseCode ?? ResponseCode.SERVICE_UNAVAILABLE)
            .header({"timestamp": Date.now(),})
            .send({
                success: success ?? false,
                message: message ?? ResponseMessage.UNEXPECTED_ERROR,
                data: data,
                statusCode: statusCode,
                event: event,
            });
    }
}

export const response = function (res: Response, code: ResponseCode, msg: any, error?: any) {
    return res
        .status(code)
        .header({"timestamp": Date.now()})
        .send(msg);
};

export const enum ResponseMessage {
    USER_NOT_FOUND = 'User not found',
    BAD_REQUEST = 'BAD_REQUEST',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    NO_ENTRIES_FOUND = 'NO_ENTRIES_FOUND',
    ENTRIES_FOUND = 'ENTRIES_FOUND',
    ENTRIES_DELETED = 'ENTRIES_DELETED',
    UID_NOT_FOUND = 'UID not found',
    NOT_FOUND = 'NOT_FOUND',
    NOT_UPDATED = 'NOT_UPDATED',
    NOT_UPLOADED = 'NOT_UPLOADED',
    DATA_NOT_PRESENT = 'DATA_NOT_PRESENT',
    ALIAS_NOT_PRESENT = 'ALIAS_NOT_PRESENT',
    ALIAS_ID_NOT_PRESENT = 'ALIAS_ID_NOT_PRESENT',
    TYPE_NOT_PRESENT = 'TYPE_NOT_PRESENT',
    ID_NOT_PRESENT = 'ID_NOT_PRESENT',
    SELF_NOT_PRESENT = 'SELF_NOT_PRESENT',
    UID_NOT_PRESENT = 'UID_NOT_PRESENT',
    USER_NOT_PRESENT = 'USER_NOT_PRESENT',
    TO_UID_NOT_PRESENT = 'TO_UID_NOT_PRESENT',
    SERVER_ERROR = 'SERVER_ERROR',
    UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
    EMAIL_PASSWORD_NOT_FOUND = 'Email or password does not match',
    EMAIL_ALREADY_EXIST = 'Email already exist',
    ITEM_ALREADY_PURCHASED = 'ITEM_ALREADY_PURCHASED',
}

export const enum ResponseCode {
    CONTINUE = 100,
    SWITCHING_PROTOCOL = 101,
    PROCESSING = 102,
    EARLY_HINTS = 103,

    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTI_STATUS = 207,
    ALREADY_REPORTED = 208,
    IM_USED = 226,

    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    SWITCH_PROXY = 306,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,

    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMED_OUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    IM_A_TEAPOT = 418,
    MISDIRECTED_REQUEST = 421,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    TOO_EARLY = 425,
    UPGRADE_REQUIRED = 426,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,

    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    VARIANT_ALSO_NEGOTIATES = 506,
    INSUFFICIENT_STORAGE = 507,
    LOOP_DETECTED = 508,
    NOT_EXTENDED = 510,
    NETWORK_AUTHENTICATION_REQUIRED = 511

}

export const enum StatusCode {
    API_NOT_ABLE_TO_PROCESS = 1500,
    UNEXPECTED_BEHAVIOUR = 1501
}
