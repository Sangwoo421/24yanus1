const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('./user');
const Notice = require('./notice');
const Faq = require('./faq');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Notice = Notice; // db 객체에 Notice 모델 추가
db.Faq = Faq;

User.init(sequelize);
Notice.init(sequelize);
Faq.init(sequelize);

if (User.associate) {
  User.associate(db);
}
if (Notice.associate) {
  Notice.associate(db);
}
if (Faq.associate) {
  Faq.associate(db);
}


module.exports = db;
