const Sequelize = require("sequelize");
const sequelize = require("./db");

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
