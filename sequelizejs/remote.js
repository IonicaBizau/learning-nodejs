const Sequelize = require("sequelize");

const sequelize = new Sequelize("mysql://b11607c1d0097d:7a8a631f@us-cdbr-iron-east-03.cleardb.net/heroku_b379d0792c09e0d?reconnect=true");
sequelize.sync().then(c => {
    console.log(c);
})
