class BaseError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }

  /* eslint-disable no-unused-vars */ // next
  static handleOnMiddleware = (error, req, res, next) => {
    if (error instanceof BaseError) {
      return res.status(error.statusCode).json({ payload: { error: error.message } });
    }

    res.status(500).json({ payload: { error: 'Something went wrong' } });
  };

  static handleUnCaughtError = () => {
    process.on('unhandledRejection', (error) => {
      throw error;
    });

    process.on('uncaughtException', (error) => {
      console.log('Uncaught error!');
      if (!(error instanceof BaseError)) {
        process.exit();
      }
    });
  };
}

module.exports = BaseError;
