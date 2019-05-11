import Koa from 'koa';
import cors from '@koa/cors';
import morgan from 'koa-morgan';
import bodyParser from 'koa-bodyparser';
import { ApolloServer } from 'apollo-server-koa';
import schema from './graphql/rootSchema';

import routes from './routes';
import { ApplicationError, NotFoundError } from './errors';
import createDataLoaders from './graphql/dataLoaders';

const errorHandler = () => async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof ApplicationError) {
      ctx.status = e.statusCode || 500;
      ctx.body = e.toJson();
    } else {
      ctx.status = 500;
      ctx.body = new ApplicationError('Something went wrong').toJson();
    }

    ctx.logger.error(e, { path: ctx.request.path });
  }
};

export default ({ logStream, context = {} } = {}) => {
  const app = new Koa();

  const apolloServer = new ApolloServer({
    schema,
    playground: true,
    introspection: true,
    context: () => ({
      ...context,
      dataLoaders: createDataLoaders({ models: context.models }),
    }),
  });

  app.context = Object.assign(app.context, context);

  app.use(bodyParser());
  app.use(errorHandler());

  if (logStream) {
    app.use(morgan('combined', { stream: logStream }));
  }

  app.use(cors());
  app.use(routes.routes());

  apolloServer.applyMiddleware({ app });

  app.use(ctx => {
    throw new NotFoundError(`The path "${ctx.request.path}" is not found`);
  });

  return app;
};
