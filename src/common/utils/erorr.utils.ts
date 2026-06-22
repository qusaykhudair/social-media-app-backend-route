export class NotFoundException extends Error {
    constructor(message: string) {
        super(message, { cause: { statusCode: 404, errorCode: "NOT_FOUND" } });
    }
}

export class NotAuthorizedException extends Error {
    constructor(message: string) {
        super(message, { cause: { statusCode: 401, errorCode: "NOT_AUTHORIZED" } });
    }
}

interface IDetails{
    path : string,
    message : string,
}

export class BadRequestException extends Error {
    constructor(message: string , public details? : Record<string , string>[]) {
        super(message, { cause: { statusCode: 400, errorCode: "BAD_REQUEST" } });
    }
}
export class UnauthenticatedException extends Error {
    constructor(message: string) {
        super(message, { cause: { statusCode: 401, errorCode: "UNAUTHENTICATED" } });
    }
}
export class ConflictException extends Error {
    constructor(message: string) {
        super(message, { cause: { statusCode: 409, errorCode: "CONFLICT" } });
    }
}

export class InternalServerException extends Error {
    constructor(message: string) {
        super(message, { cause: { statusCode: 500, errorCode: "INTERNAL_SERVER_ERROR" } });
    }
}