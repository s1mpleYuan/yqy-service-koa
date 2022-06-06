/*
 * @Author: yuanqingyan
 * @Date: 2022-05-24 15:39:04
 * @LastEditors: yuanqingyan
 * @Description: 路由Route Index
 * @FilePath: \yqy-service-koa\projects\yqy-service-user\routes\index.js
 */

const compose = require("koa-compose");
const glob = require("glob");
const {
  resolve
} = require("path");

registerRouter = () => {
  let routers = [];
  glob
    .sync(resolve(__dirname, "./", "**/*.js"))
    .filter((value) => value.indexOf("index.js") === -1)
    .map((router) => {
      routers.push(require(router).routes());
      routers.push(require(router).allowedMethods());
    });
  return compose(routers);
};

module.exports = registerRouter;