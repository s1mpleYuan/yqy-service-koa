/*
 * @Author: yuanqingyan
 * @Date: 2022-03-21 17:01:44
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-27 11:28:19
 * @Description: api 接口 响应返回
 * @FilePath: \yqy-service-koa\projects\yqy-service-user\utils\resextra.js
 */
/**
 * API 接口响应 code 规范定义
 * 1 接口成功且业务返回是正向的，不可将一些错误返回放入 code = 1 中
 * 0 接口失败 存在接口代码逻辑错误
 * 10001 接口入参不规范
 * 10005 接口成功 但 业务存在问题 即 业务非正向
 */

function resextra() {
  return async function(ctx, next) {
    ctx.success = function(data, msg, code) {
      ctx.type = 'json';
      // 打印日志
      ctx.body = {
        code: code || 1,
        data,
        msg: msg || '成功'
      };
    };

    ctx.fail = function(msg, code) {
      ctx.type = 'json';
      // 打印日志
      ctx.body = {
        code: code || 0,
        data: null,
        msg: msg || '失败'
      };
    }
  }
}

module.exports = resextra;