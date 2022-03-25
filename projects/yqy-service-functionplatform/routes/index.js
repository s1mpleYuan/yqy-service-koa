/*
 * @Author: yuanqingyan
 * @Date: 2022-03-21 17:11:28
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-03-21 17:11:28
 * @Description: routes 路由index
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\routes\index.js
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