import Koa from 'koa';
import cors from '@koa/cors';
import morgan from 'koa-morgan';

import routes from './routes';

import { ApplicationError } from './errors';

const errorHandler = () => async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof ApplicationError) {
      ctx.status = e.statusCode || 500;
      ctx.body = e.toJson();
    } else {
      res.status = 500;
      ctx.body = new ApplicationError('Something went wrong').toJson();
    }

    ctx.logger.error(e, { path: ctx.request.path });
  }
};

export default ({ logStream, context = {} } = {}) => {
  const app = new Koa();

  app.context = Object.assign(app.context, context);

  app.use(errorHandler());

  if (logStream) {
    app.use(morgan('combined', { stream: logStream }));
  }

  app.use(cors());
  app.use(routes.routes());

  return app;
};
