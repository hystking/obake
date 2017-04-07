const Koa = require("koa");
const router = require("koa-router")();
const crawl = require("./lib/crawl");

const app = new Koa();

router.get("/", async function (ctx) {
  const url = ctx.request.query.url;
  const res = {
    url,
    crawled_at: Date.now(),
  };
  try {
    Object.assign(res, await crawl(url));
  } catch(e) {
    ctx.status = 500;
    Object.assign(res, {error: e});
  } finally {
    ctx.body = res;
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
