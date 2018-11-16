import winston from 'winston';

const errorFormatter = winston.format(info => {
  return info.message instanceof Error
    ? { ...info, stack: info.message.stack }
    : info;
});

export default () => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      errorFormatter(),
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: [new winston.transports.Console()],
  });
};
