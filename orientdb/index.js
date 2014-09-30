var OrientDB = require("oriento");
var server = OrientDB({ username: "guest", password: "guest" });

var db = server.use({
    name: "countries",
    username: "admin",
    password: "admin"
});

db.class.get("OUser").then(function (OUser) {
  return OUser.list();
}).then(function (results) {
  console.log("Users:", results);
  process.exit();
}).done();
