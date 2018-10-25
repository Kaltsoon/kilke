const Koa = require('koa');
const koaStatic = require('koa-static');
const path = require('path');
const fs = require('fs');

const config = require('../config');

const { PORT = 8080 } = process.env;
const app = new Koa();

const readFile = (...args) => {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
}

app.use(koaStatic(path.join(__dirname, '..', 'build')));

app.use(async (ctx, next) => {
  const data = await readFile(path.join(__dirname, '..', 'build', 'index.html'), 'utf-8');

  ctx.body = data.replace(/"__SERVER_STATE__"/, JSON.stringify({ config }));

  ctx.response.set({
    'Content-Type': 'text/html',
  });
});

app.listen(PORT);
