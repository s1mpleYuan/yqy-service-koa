
function validator(options = {}) {
  return async (ctx, next) => {
    const {
      url: fn,
      method: type
    } = ctx.request;
    const moduleName = 'func';
    const params = ctx.request.body;
    // 校验参数配置对象
    const keys = Object.keys(options);
    if (keys.length == 0) {
      await next();
    } else {
      let validateNum = 0;
      for (validateNum; validateNum < keys.length; validateNum++) {
        const fieldName = keys[validateNum];
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
}

module.exports = validator;