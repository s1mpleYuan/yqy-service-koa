/*
 * @Author: yuanqingyan
 * @Date: 2022-03-21 17:01:44
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-06 16:07:43
 * @Description: api 接口 响应返回
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\utils\resextra.js
 */
/*
 api 接口响应规范：
  1：接口成功
  0：接口错误返回
  10001：参数不规范
*/
function resextra(option = {}) {
  return async function(ctx, next) {
    ctx.success = function(data, code, msg) {
      ctx.type = option.type || "json";
      ctx.body = {
        code: option.code || code || 1,
        msg: option.msg || msg || "success",
        data,
      };
    };

    ctx.fail = function(msg, code) {
      ctx.type = option.type || "json";
      ctx.body = {
        code: code || option.code || 0,
        data: null,
        msg: msg || option.msg || "接口异常",
      };
    };

    await next();
  };
}

module.exports = resextra;