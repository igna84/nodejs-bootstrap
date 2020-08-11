const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const config = require("./config");
const path = require('path');
const appDir = path.dirname(require.main.filename);
const { combine, timestamp, printf } = winston.format;

const logFormat = printf( info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const options = {
    format: combine(
            timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        })
        , logFormat
    ),
    // log파일
    file: {
        level           : 'info'
        , dirname         : `${appDir}${config.LOG_PATH}`
        , filename        : `/%DATE%.log` // 로그파일을 남길 경로
        , handleExceptions: true
        , json            : false
        , maxsize         : 5 * 1024 * 1024 // 5MB
        , maxFiles        : 5
        , colorize        : false
        , format          : combine(
            timestamp()
            , logFormat
        )
    }
    // 개발 시 console에 출력
    , console: {
        level           : 'debug'
        , handleExceptions: true
        , json            : false
        , colorize        : true
        , format          : combine(
            winston.format.colorize()
            , winston.format.simple()
            , logFormat
        )
    }
}

//logger 설정
const logger = new winston.createLogger({
    format: options.format
    , transports: [
        new winstonDaily( options.file )
        , new winston.transports.Console( options.console )
    ]
    , exitOnError: false
});

module.exports = { logger };