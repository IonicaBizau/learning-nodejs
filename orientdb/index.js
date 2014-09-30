var OrientDB = require("oriento");
var server = OrientDB({
    // TODO Do not use root credentials
    username: "root",
    password: "3B2BE02AF63AAD88891E7E5501946D08CA10393B516D1062C23B8D110BD3CFD0"
});

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
