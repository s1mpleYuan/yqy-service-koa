const UserModel = require('./models/user');
const UserInfoModel = require('./models/userInfo');

UserInfoModel.sync({
  force: true
});