/*
 * @Author: yuanqingyan
 * @Date: 2022-03-21 08:54:53
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-05 17:26:45
 * @Description: app.js
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\app.js
 */
const Koa = require("koa");
const path = require("path");
const router = require("koa-router")();
const app = new Koa();
const resextra = require("./utils/resextra"); // 设置统一的响应格式
const {
    LOG
} = require("./utils/logger"); // logger
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

const SECRET = require("./config/index").jwt_config.secret;
app.use(
    koaJwt({
        secret: SECRET
    }).unless({
        // token 白名单
        path: [
            /^\/func\/user\/login/,
            /^\/func\/user\/register/,
            /^\/func\/platform\/createPlatformMenu/
            // /^\/document\/user\/login/,
            // /^\/colorful/,
        ],
    })
);

app.use(registerRouter());
app.use(router.routes()); // 启动路由
app.use(router.allowedMethods()); // router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头

const {
    project_port: port,
    project_name: pn
} = require("./config/index");
app.listen(port, () => {
    // console.log(`[${pn}] start-quick is starting at port ${port} - ${dayjs().format('YYYY/MM/DD HH:mm:ss')}`);
    LOG(`${pn}`, `start-quick is starting at port ${port}`)
});