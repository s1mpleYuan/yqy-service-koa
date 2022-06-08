const UserModel = require('./models/user');
const UserInfoModel = require('./models/userInfo');


UserInfoModel.sync({
  alter: true
});