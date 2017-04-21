const Koa = require("koa");
const router = require("koa-router")();

const app = new Koa();

router.get("/api/ping.json", async function (ctx) {
  ctx.body = {status: "alive"};
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
