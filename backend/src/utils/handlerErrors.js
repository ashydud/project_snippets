export class CustomError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.status = "error"
    }
}

export class TagNotFoundError extends CustomError {
    constructor(message) {
        super(message, 404)
    }
}

export class RoleNotFoundError extends CustomError {
    constructor(message) {
        super(message, 404)
    }
}

export class LanguageNotFoundError extends CustomError {
    constructor(message) {
        super(message, 404)
    }
}

export class ValidationError extends CustomError {
    constructor(message) {
        super(message, 400)
    }
}