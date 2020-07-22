"use strict";

const elasticsearch = require("elasticsearch")
    , faker = require("faker")
    ;

let client = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace"
});

if (process.argv.indexOf("--insert")) {
    for (let i = 0; i < 1e3; ++i) {
        client.index({
            index: "users",
            type: "user",
            id: i,
            body: faker.helpers.userCard()
        }, function (err, res) {
            console.log(err || res);
        });
    }
} else {
    client.index({
        index: "users",
        type: "user",
        id: i,
        body: faker.helpers.userCard()
    }, function (err, res) {
        console.log(err || res);
    });
}

