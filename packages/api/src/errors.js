export class ApplicationError extends Error {
  constructor(message, properties = {}) {
    super();

    this.message = message;
    this.properties = properties;
    this.statusCode = 500;
    this.type = 'applicationError';
  }

  toJson() {
    return {
      message: this.message,
      properties: this.properties,
      statusCode: this.statusCode,
      type: this.type,
    };
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message, properties = {}) {
    super(message, properties);

    this.statusCode = 404;
    this.type = 'notFoundError';
  }
}

export class BadInputError extends ApplicationError {
  constructor(message, properties = {}) {
    super(message, properties);

    this.statusCode = 400;
    this.type = 'badInputError';
  }
}

export class ForbiddenError extends ApplicationError {
  constructor(message, properties = {}) {
    super(message, properties);

    this.statusCode = 403;
    this.type = 'forbiddenError';
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(message, properties = {}) {
    super(message, properties);

    this.statusCode = 401;
    this.type = 'unauthorizedError';
  }
}
