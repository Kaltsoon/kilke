import winston from 'winston';

export default () => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
    ],
  });
};
