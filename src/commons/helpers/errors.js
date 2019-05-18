const http = require('http-status-codes');
/**
 * reff: https://blog.restcase.com/rest-api-error-codes-101/
 * kalasenja api ini menggunakan 5 standar error kode:
 *
 * 1. 400 untuk validasi atau error lain
 * 2. 401 untuk credential
 * 3. 403 untuk hak akses
 * 4. 404 untuk uri yang tidak ada di api
 * 5. 500 untuk internal server error
 *
 * 500 (Internal Server Error)
 */
class AppError extends Error {
  constructor(message, errorCode) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);

    this.errorCode = errorCode || http.INTERNAL_SERVER_ERROR;
  }

  /**
   * example {
   *   "errorCode"  : "444444",
   *   "moreInfo"   : "http://www.example.gov/developer/path/to/help/for/444444, http://tests.org/node/444444"
   * }
   */
  moreInfo(info) {
    this.moreInfo = info;
  }
}

/**
 * 404 (Not Found)
 * when the client URI cannot be mapped to a resource
 */
class NotFoundError extends AppError {
  constructor(message) {
    super(message);
    this.errorCode = http.NOT_FOUND;
  }
}

/**
 * 401 (Unauthorized)
 * jika ada masalah dalam credential
 * jika klien mencoba beroprasi dengan sumber daya dilindungi
 * tanpa memberikan credential yang salah atau tidak sama sekali
 */
class UnauthorizedError extends AppError {
  constructor(message) {
    super(message);
    this.errorCode = http.UNAUTHORIZED;
  }
}

/**
 * 403 (Forbidden)
 * untuk melarang akses (hak akses) tanpa peduli pada otorisasi
 * bukan merupakan masalah kredential karena sudah di tangani kode 401 (Authorized)
 */
class ForbiddenError extends AppError {
  constructor(message) {
    super(message);
    this.errorCode = http.FORBIDDEN;
  }
}

/**
 * 400 (Bad Request)
 * dapat di gunakan untuk menunjukan kegagalan yang tidak spesifik
 * bisa berisi dokumen yang menjelaskan kesalahan klien
 * bisa di gunakan untuk validasi
 */
class BadRequestError extends AppError {
  constructor(message) {
    super(message);
    this.errorCode = http.BAD_REQUEST;
  }

  field(name) {
    this.field = name;
  }

  /**
   * Verbose, plain language description of the problem.
   * Provide developers suggestions about how to solve their problems here
   */
  developerMessage(msg) {
    this.developerMessage = msg;
  }

  /**
   * This is a message that can be passed along to end-users, if needed.
   */
  userMessage(msg) {
    this.userMessage = msg;
  }
}

module.exports = {
  AppError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
};
