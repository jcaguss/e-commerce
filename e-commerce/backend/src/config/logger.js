import winston from "winston";

const customLevelOpt = {
  levels:
    process.env.MODE === "development"
      ? {
          fatal: 0,
          error: 1,
          warning: 2,
          info: 3,
          debug: 4,
        }
      : {
          fatal: 0,
          error: 1,
          warning: 2,
          info: 3,
        },
  colors:
    process.env.MODE === "development"
      ? {
          fatal: "red",
          error: "yellow",
          warning: "cyan",
          info: "blue",
          debug: "grey",
        }
      : {
          fatal: "red",
          error: "yellow",
          warning: "cyan",
          info: "blue",
        }
};
const logger = winston.createLogger({
  levels: customLevelOpt.levels,
  transports: 
  process.env.MODE === "development"
  ? [
    new winston.transports.File({
      filename: "./errors.html",
      level: "fatal",
      format: winston.format.combine(winston.format.simple()),
    }),
    new winston.transports.File({
      filename: "./errors.html",
      level: "error",
      format: winston.format.combine(winston.format.simple()),
    }),
    new winston.transports.File({
      filename: "./loggers.html",
      level: "warning",
      format: winston.format.combine(winston.format.simple()),
    }),
    new winston.transports.File({
      filename: "./loggers.html",
      level: "info",
      format: winston.format.combine(winston.format.simple()),
    }),
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      )
    })
  ]
  : [
    new winston.transports.File({
      filename: "./errors.html",
      level: "fatal",
      format: winston.format.combine(winston.format.simple()),
    }),
    new winston.transports.File({
      filename: "./errors.html",
      level: "error",
      format: winston.format.combine(winston.format.simple()),
    }),
    new winston.transports.File({
      filename: "./loggers.html",
      level: "warning",
      format: winston.format.combine(winston.format.simple()),
    }),
    new winston.transports.File({
      filename: "./loggers.html",
      level: "info",
      format: winston.format.combine(winston.format.simple()),
    })
  ]
});

export const addLogger = (req, res, next) => {
  req.logger = logger;
  if(process.env.MODE === "development"){
    req.logger.debug(
        `${req.method} es ${req.url} - ${new Date().toLocaleTimeString()}`
      );
  }
  next();
};
