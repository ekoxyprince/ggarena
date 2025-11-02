export class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
export class AuthenticationError extends CustomError {
  constructor(message, code = 401) {
    super(message, code);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
export class AuthorizationError extends CustomError {
  constructor(message, code = 403) {
    super(message, code);
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}
export class BadrequestError extends CustomError {
  constructor(message, code = 400) {
    super(message, code);
    Object.setPrototypeOf(this, BadrequestError.prototype);
  }
}
