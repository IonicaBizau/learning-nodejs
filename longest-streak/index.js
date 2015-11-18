var Moment = require("moment")
  , Gry = require("gry")
  , Fs = require("fs")
  ;

var repo = new Gry("./foo")
  , date = new Moment("1 January 1970")
  ;

repo.create(function () {
    function makeCommit() {
        date.add("1", "days");
        if (date.isAfter(new Moment())) { return; }
        console.log(date.format("LLL"));
        Fs.writeFileSync("./foo/test", Math.random());
        repo.commit("Test", "--date='" + date.format("LLL") + "' .", makeCommit);
    }
    Fs.writeFileSync("./foo/test", Math.random());
    repo.exec("add .", function () {
        repo.commit("Test", makeCommit);
    });
});
