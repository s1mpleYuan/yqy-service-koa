const Koa = require("koa");
const path = require("path");
const router = require("koa-router")();
const app = new Koa();
const resextra = require("./utils/resextra"); // 设置统一的响应格式
const logger = require("./utils/logger"); // logger
const bodyparser = require("koa-bodyparser"); // bodyparser
const cors = require("koa-cors"); // 跨域cors
const koaJwt = require("koa-jwt"); // koa token校验
const registerRouter = require("./routes"); // 路由
const static = require("koa-static"); // static 静态资源
const dayjs = require('dayjs'); // 时间库 dayjs

// middlewares 中间件注册
// bodyparser
app.use(bodyparser({
  enableType: ["json", "form", "text"]
}));
// 静态资源中间件注册
app.use(static(path.join(__dirname, "public"))); // 引入静态资源配置中间件
// 注册自定义的统一api响应格式
app.use(resextra());

logger();

// cors 跨域设置
app.use(
  cors({
    origin: "*",
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE", "OPTIONS", "PUT"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      // 自定义返回结果
      ctx.status = 401;
      ctx.fail(err.message, 401);
    } else {
      throw err;
    }
  });
});

const SECRET = require("./config/index").__jwt_confg.secret;
app.use(
  koaJwt({
    secret: SECRET
  }).unless({
    // token 白名单
    path: [
      /^\/user\/login/,
      /^\/user\/register/
      // /^\/func\/fileUpload/,
    ],
  })
);

app.use(registerRouter());
app.use(router.routes()); // 启动路由
app.use(router.allowedMethods()); // router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头

const sever_listen = () => {
  std_clear();
  log(`${pn}`, `start-quick is starting at port ${port} \n`);0-9
}

const {
  __project_port: port,
  __project_name: pn
} = require("./config/index");
app.listen(port, sever_listen);