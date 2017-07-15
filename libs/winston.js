const winston = require('winston');
const moment = require('moment');
const Rotate = require('winston-daily-rotate-file');
const config = require('config');

const timeStamp = () => moment().format('YYYY-MM-DD HH:mm:ss');

config.winston.info.console.timestamp = timeStamp;
config.winston.info.rotateFile.timestamp = timeStamp;
config.winston.error.rotateFile.timestamp = timeStamp;

const infoLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(config.winston.info.console),
    new (Rotate)(config.winston.info.rotateFile)
  ]
});

const errorLogger = new (winston.Logger)({
  transports: [
    new (Rotate)(config.winston.error.rotateFile)
  ]
});

/**
 * インフォメーションログを出力します。
 * @param {string} logName - ログ名。
 * @param {number} userId - ユーザーID。
 * @param {any} data - ログデータ。
 */
exports.info = (logName, userId, data) => {
  const logObject = {};

  if (logName) {
    logObject.logName = logName;
  }

  if (userId) {
    logObject.userId = userId;
  }

  if (data) {
    logObject.data = data;
  }

  infoLogger.info('infoLog', logObject);
};

/**
 * エラーログを出力します。
 * @param {string} logName - ログ名。
 * @param {number} userId - ユーザーID。
 * @param {any} data - ログデータ。
 * @param {string} stackTrace - suta。
 */
exports.error = (logName, userId, data, stackTrace) => {
  const logObject = {};

  if (logName) {
    logObject.logName = logName;
  }

  if (userId) {
    logObject.userId = userId;
  }

  if (data) {
    logObject.data = data;
  }

  if (stackTrace) {
    logObject.stackTrace = stackTrace;
  } else {
    // スタックトレースがなければ呼び出し元を辿る。
    const errorObject = {};
    Error.captureStackTrace(errorObject);
    logObject.stackTrace = errorObject.stack;
  }

  // winstonのコンソールログが見づらいので通常のコンソールログを出力。
  console.error(logObject.stackTrace);

  errorLogger.error('errorLog', logObject);
};
