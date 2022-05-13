/*
 * @Author: yuanqingyan
 * @Date: 2022-05-12 10:51:55
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-12 13:49:31
 * @Description: Test Route 开发测试接口route
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\routes\modules\test.js
 */

const router = require('koa-router')();
const multer = require('koa-multer');
const validator = require('../../utils/validator');
const moduleName = 'test';

router.prefix('/func/test');

const testMiddleware = (v1, ctx, next) => {
  console.log('before');
  next();
  console.log('after');
}

router.post('/testMiddleware', testMiddleware, async (ctx) => {
  console.log('context');
  ctx.success(123);
})

module.exports = router;