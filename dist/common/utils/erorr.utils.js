"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerException = exports.ConflictException = exports.UnauthenticatedException = exports.BadRequestException = exports.NotAuthorizedException = exports.NotFoundException = void 0;
class NotFoundException extends Error {
    constructor(message) {
        super(message, { cause: { statusCode: 404, errorCode: "NOT_FOUND" } });
    }
}
exports.NotFoundException = NotFoundException;
class NotAuthorizedException extends Error {
    constructor(message) {
        super(message, { cause: { statusCode: 401, errorCode: "NOT_AUTHORIZED" } });
    }
}
exports.NotAuthorizedException = NotAuthorizedException;
class BadRequestException extends Error {
    details;
    constructor(message, details) {
        super(message, { cause: { statusCode: 400, errorCode: "BAD_REQUEST" } });
        this.details = details;
    }
}
exports.BadRequestException = BadRequestException;
class UnauthenticatedException extends Error {
    constructor(message) {
        super(message, { cause: { statusCode: 401, errorCode: "UNAUTHENTICATED" } });
    }
}
exports.UnauthenticatedException = UnauthenticatedException;
class ConflictException extends Error {
    constructor(message) {
        super(message, { cause: { statusCode: 409, errorCode: "CONFLICT" } });
    }
}
exports.ConflictException = ConflictException;
class InternalServerException extends Error {
    constructor(message) {
        super(message, { cause: { statusCode: 500, errorCode: "INTERNAL_SERVER_ERROR" } });
    }
}
exports.InternalServerException = InternalServerException;
