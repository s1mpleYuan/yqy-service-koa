/*
 * @Author: yuanqingyan
 * @Date: 2022-05-24 15:39:45
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-06-08 17:22:57
 * @Description: User Route 用户接口路由
 * @FilePath: \yqy-service-koa\projects\yqy-service-user\routes\modules\user.js
 */

const router = require('koa-router')();
const {
  createUser,
  queryUserByLogin
} = require('../../services/userService');
const ACCESS_TOKEN = require('../../utils/authorization');
const validator = require('../../utils/validator');
const axios = require('axios');

router.prefix("/user");

// 注册 register
router.post('/register', validator({
  userName: {
    required: true
  },
  password: {
    required: true,
    min: 8,
    max: 20
  },
  email: {},
  phone: {
    dependentFields: 'verificationCode'
  },
  verificationCode: {},
  avatarUrl: {},
  applicationCode: {}

}), async (ctx) => {
  try {
    const user = await createUser(ctx.request.body)
    if (user) {
      ctx.success(user, '注册成功');
    } else ctx.fail('注册失败，请联系管理员');
  } catch (error) {
    ctx.fail(error);
  }
});


// 登录 login
router.post('/login', validator({
  loginStr: {
    required: true,
    min: 8
  },
  password: {
    required: true,
    min: 8,
    max: 20
  }
}), async (ctx) => {
  try {
    const user = await queryUserByLogin(ctx.request.body);
    if (user) {
      INFO(ctx.request.url, `${user.userId} - ${user.userName} 登录`);
      ctx.success({
        ...user.dataValues,
        token: ACCESS_TOKEN(user.userId)
      }, '登录成功');
    } else {
      ctx.fail('登录失败，请检查输入的账号或密码是否正确');
    }
  } catch (error) {
    ctx.fail(error)
  }
})

// 短信验证码
router.get('/getVerificationCode', validator({
  phone: {
    required: true,
    min: 11,
    max: 11
  }
}), async (ctx, next) => {
  try {
    console.log(ctx.params, 11);
    ctx.success("1");
  } catch (error) {
    crx.fail(error);
  }
})


module.exports = router;