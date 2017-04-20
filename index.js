const Koa = require("koa");
const router = require("koa-router")();
const scrape = require("./lib/scrape");

const app = new Koa();

router.get("/", async function (ctx) {
  const url = ctx.request.query.url;
  const res = {
    url,
    scraped_at: Date.now(),
  };
  try {
    Object.assign(res, await scrape(url));
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

app.listen(5000);