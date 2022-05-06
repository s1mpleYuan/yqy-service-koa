/*
 * @Author: yuanqingyan
 * @Date: 2022-05-06 14:46:13
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-06 16:06:50
 * @Description: 接口http 入参校验方法
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\utils\validator.js
 */
async function validator(ctx, next, params, options = {}, moduleName, fn) {
  const keys = Object.keys(options);
  if (keys.length == 0) {
    await next();
  } else {
    let validateNum = 0;
    for (validateNum; validateNum < keys.length; validateNum++) {
      const fieldName = keys[validateNum];
      // console.log(fieldName, options[fieldName], params[fieldName]);
      const {
        required,
        min,
        max,
        type
      } = options[fieldName];
      const value = params[fieldName];
      if (required && !value) {
        ctx.fail(`${fieldName}不可为空`, 10001);
        error(moduleName, fn, `${fieldName}不可为空`);
        break;
      }
      if (type && typeof value != type) {
        ctx.fail(`${fieldName} 类型为 ${type}，而非${typeof type}`);
        break;
      }
      if ((min || max) && (!type || (type == 'string' || type == 'number'))) {
        let size = value;
        if ((!type || type == 'string')) {
          size = value.length;
        }
        // console.log(size, 'size');
        if ((min && size < min) || (max && size > max)) {
          const text = min && max ? `在${min}与${max}之间` : max && !min ? `小于${max}` : `大于${min}`;
          ctx.fail(`${fieldName}的` + (type == 'number' ? '大小' : '长度') + '应' + text, 10001);
          break;
        }
      }
    }
    if (validateNum == keys.length) {
      await next();
    }
  }
}

module.exports = validator;