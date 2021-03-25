/* ****************************************************************
 * Name: logs.js
 * Description: set up application logging for Winston
 *              https://github.com/winstonjs/winston
 * Author: Stephen Moss
 * Date: 25/03/2021
 * *************************************************************** */

const winston = require('winston');

/*
 * Level specifies message level. Logger will only output messages of
 * a specified level and higher. In this configuration, production mode
 * will only log messages with a level of info or higher, and development
 * mode will only log messages with a level of debug or higher
 * Message Levels in order of priority:
 * 0 error
 * 1 warn
 * 2 info
 * 3 verbose
 * 4 debug
 * 5 silly
 */

// custom log format
const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    // eslint-disable-next-line arrow-parens
    (info: any): string => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// create the logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  // format: winston.format.combine(winston.format.splat(), winston.format.simple()),
  format: logFormat,
  transports: [new winston.transports.Console()],
});

module.exports = logger;