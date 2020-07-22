const Koa = require('koa');
const app = new Koa();

// response
app.use("/", ctx => {
  ctx.body = 'Hello Koa';
});

app.use(ctx => {
  ctx.status = 404
  ctx.body = 'Hello Koa';
});

app.listen(3000);
