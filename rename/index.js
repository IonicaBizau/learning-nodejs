var Fs = require("fs");

Fs.renameSync("test/foo/a", "test/foo/b");
Fs.renameSync("test", "tmp");
Fs.renameSync("tmp/foo/b", "tmp/foo/a");
Fs.renameSync("tmp", "test");
