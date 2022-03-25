/*
 * @Author: yuanqingyan
 * @Date: 2022-03-21 17:01:44
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-03-21 17:02:22
 * @Description: api 接口 响应返回
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\utils\resextra.js
 */
function resextra(option = {}) {
  return async function(ctx, next) {
    ctx.success = function(data, code, msg) {
      ctx.type = option.type || "json";
      ctx.body = {
        code: option.code || code || 200,
        msg: option.msg || msg || "success",
        data,
      };
    };

    ctx.fail = function(msg, code) {
      console.error(msg);
      ctx.type = option.type || "json";
      ctx.body = {
        code: code || option.code || 500,
        data: null,
        msg: msg || option.msg || "接口异常",
      };
    };

    await next();
  };
}

module.exports = resextra;