// src/config/loggerConfig.config.ts
import { utilities as nestWinstonModuleUtilities  } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file'

export const winstonLoggerConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('MyApp', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    // 按天轮转的文件输出
    new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%-error.log',  // 按日期分割的文件名
      datePattern: 'YYYY-MM-DD',  // 日志文件按天分割
      level: 'error',  // 仅记录错误级别日志
      maxFiles: '14d',  // 保留14天的日志
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%-combined.log',  // 记录其他所有日志
      datePattern: 'YYYY-MM-DD',
      level: 'info',  // 记录所有 info 级别及以上的日志
      maxFiles: '30d',  // 保留30天的日志
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
};