const Sequelize = require("sequelize");

const sequelize = new Sequelize('seq_users', 'root', '123', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  }
});

User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
}).then(c => {
    console.log("Created user", c.toJSON());
}).catch(e => console.error(e));
