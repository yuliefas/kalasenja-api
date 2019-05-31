const http = require('http-status-codes');
const { getKeysFromDoc } = require('./');

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
 * const fail =
 * {
 *   error: {
 *     code: 400,
 *     type: 'Bad Request',
 *     message: 'missing attribute name'
 *   },
 *   data: null,
 *   meta: null,
 * }
 *
 * const error =
 * {
 *   error: {
 *     code: 500,
 *     type: 'Internal Server Error',
 *     message: 'undefined Object x on line [200] ...'
 *   },
 *   data: null,
 *   meta: null,
 * }
 *
 * const success =
 * {
 *   error: null,
 *   data: {
 *     items: [{
 *       name: 'book'
 *     }, ...]
 *   },
 *   meta: {
 *     current_page: 1,
 *     total_page: 5,
 *     limit_perpage: 40,
 *   },
 * }
 */

/**
 * 500 (Internal Server Error)
 * {
 *   error: {
 *     code: 500,
 *     type: 'Internal Server Error',
 *     message: 'undefined Object x on line [200] ...'
 *   },
 *   data: null,
 *   meta: null,
 * }
 *
 * docs: https://nodejs.org/api/errors.html#errors_new_error_message
 *
 * @class AppError
 * @extends {Error}
 */
class AppError extends Error {
  /**
   * Creates an instance of AppError.
   * @param {String} message
   * @param {Number} errorCode
   * @memberof AppError
   */
  constructor(message, errorCode) {
    super(message);

    Error.captureStackTrace(this, this.constructor.name);

    const code = errorCode || http.INTERNAL_SERVER_ERROR;
    this.error = {
      code,
      type: http.getStatusText(code),
      message: message.toString(),
      // stack: this.stack,
    };
    this.data = null;
    this.meta = null;
  }

  /**
   *
   * example {
   *   "errorCode"  : "444444",
   *   "meta"   : "http://www.example.gov/developer/path/to/help/for/444444, http://tests.org/node/444444"
   * }
   *
   * @param {*} meta
   * @memberof AppError
   */
  setMeta(meta) {
    this.meta = meta;
  }
}

/**
 * 404 (Not Found)
 * when the client URI cannot be mapped to a resource
 *
 * @class NotFoundError
 * @extends {AppError}
 */
class NotFoundError extends AppError {
  constructor(message) {
    super(message, http.NOT_FOUND);
  }
}

/**
 * 401 (Unauthorized)
 * jika ada masalah dalam credential
 * jika klien mencoba beroprasi dengan sumber daya dilindungi
 * tanpa memberikan credential yang salah atau tidak sama sekali
 *
 * @class UnauthorizedError
 * @extends {AppError}
 */
class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, http.UNAUTHORIZED);
  }
}

/**
 * 403 (Forbidden)
 * untuk melarang akses (hak akses) tanpa peduli pada otorisasi
 * bukan merupakan masalah kredential karena sudah di tangani kode 401 (Authorized)
 *
 * @class ForbiddenError
 * @extends {AppError}
 */
class ForbiddenError extends AppError {
  /**
   * Creates an instance of ForbiddenError.
   * @param {String} message
   * @memberof ForbiddenError
   */
  constructor(message) {
    super(message, http.FORBIDDEN);
  }
}

/**
 * 400 (Bad Request)
 * dapat di gunakan untuk menunjukan kegagalan yang tidak spesifik
 * bisa berisi dokumen yang menjelaskan kesalahan klien
 * bisa di gunakan untuk validasi
 *
 * @class BadRequestError
 * @extends {AppError}
 */
class BadRequestError extends AppError {
  /**
   * Creates an instance of BadRequestError.
   * @param {String} message
   * @param {Object} meta { validations: [] }
   * @memberof BadRequestError
   */
  constructor(message, meta) {
    super(message, http.BAD_REQUEST);

    const allowMeta = ['validations'];

    this.setMeta(getKeysFromDoc(meta, allowMeta));
  }
}

class Success {
  constructor(data, meta) {
    this.data = data;
    this.meta = meta;
    this.error = null;
  }
}

module.exports = {
  AppError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  Success,
};
