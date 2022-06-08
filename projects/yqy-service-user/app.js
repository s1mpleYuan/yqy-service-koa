const Koa = require("koa");
const path = require("path");
const router = require("koa-router")();
const app = new Koa();
const registerRouter = require("./routes"); // 路由
const bodyparser = require("koa-bodyparser"); // bodyparser
const cors = require("koa-cors"); // 跨域cors
const resextra = require("./utils/resextra"); // 设置统一的响应格式
const koaJwt = require("koa-jwt"); // koa token校验
const static = require("koa-static"); // static 静态资源
const createLogger = require("./utils/loggers"); // loggers 日志打印

// middlewares 中间件注册
// bodyparser
app.use(bodyparser({
  enableType: ["json", "form", "text"]
}));

// 静态资源中间件注册
app.use(static(path.join(__dirname, "public"))); // 引入静态资源配置中间件

// 注册自定义的统一api响应格式
app.use(resextra());

// 创建日志打印工具到全局
app.use(createLogger());

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

app.use(
  koaJwt({
    secret: require("./config/index").__jwt_config.secret
  }).unless({
    // token 白名单
    path: [
      /^\/user\/login/,
      /^\/user\/register/
    ],
  })
);


app.use(registerRouter());
app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头


const {
  __project_port: port,
  __project_name: pn
} = require("./config/index");
app.listen(port, () => {
  console.log(`start-quick is starting at port ${port} \n`);
});