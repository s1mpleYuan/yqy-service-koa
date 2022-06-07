/*
 * @Author: yuanqingyan
 * @Date: 2022-05-06 14:46:13
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-06-07 13:40:43
 * @Description: 接口http 入参校验中间件
 * @FilePath: \yqy-service-koa\projects\yqy-service-user\utils\validator.js
 */
// 模块名称
const moduleName = 'new project name';

/**
 * @description: 接口入参校验中间件方法
 * @return {*}
 * @author: yuanqingyan
 * @param {Object} options 配置对象 { key: { required, min, max, type } }
 */
function validator(options = {}) {
  return async (ctx, next) => {
    // 接口请求头中的调取的方法路径以及接口类型
    const {
      url: path,
      method: type
    } = ctx.request;
    // 获取接口入参 目前暂时只允许 GET 和 POST 请求
    const params = type == 'GET' ? ctx.query : ctx.request.body;
    // 校验参数配置对象
    const keys = Object.keys(options);
    if (keys.length == 0) {
      // 无配置对象 即不需要校验直接进入下个中间件
      await next();
    } else {
      // 已经校验的数量
      let validated_num = 0;
      for (validated_num; validated_num < keys.length; validated_num++) {
        // 获取当前参数具体的校验配置详情
        const field_key = keys[validated_num]; // 当前校验的参数 key
        const {
          required,
          min,
          max,
          type
        } = options[field_key]; // 当前参数的校验配置
        const value = params[field_key]; // 参数具体值
        if (required && !value) {
          // 当该字段需必填且参数值为空
          ctx.fail(`${field_key}不可为空`, 10001);
          // error(moduleName, fn, `${fieldName}不可为空`);
          break;
        }
        if (type && typeof value != type) { // 当接口参数值与配置校验的参数值类型不符
          ctx.fail(`${field_key} 类型为 ${type}，而非${typeof type}`);
          break;
        }
        if ((min || max) && (!type || (type == 'string' || type == 'number'))) {
          // 存在最小(大)值(长度)的校验配置
          let size = value;
          if ((!type || type == 'string')) {
            // 当为校验字符串长度时 校验长度为字符串长度
            size = value.length;
          }
          if ((min && size < min) || (max && size > max)) {
            // 判断大小(长度)是否符合配置
            const text = min && max ? `在${min}与${max}之间` : max && !min ? `小于${max}` : `大于${min}`;
            ctx.fail(`${field_key}的` + (type == 'number' ? '大小' : '长度') + '应' + text, 10001);
            break;
          }
        }
      }
      // 全部校验循环结束后 判断校验的数量和参数校验配置的key长度对比
      if (validated_num == keys.length) {
        // 相等时即为全部校验通过
        await next();
      }
    }
  }
}

module.exports = validator;