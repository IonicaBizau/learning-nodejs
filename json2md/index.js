const json2md = require("json2md");

const URL = "https://www.youtube.com/watch?v=pBYqen3B2gc";

// add custom types for json2md
json2md.converters.linkToVideo = function(input, json2md) {
  return "Watch the video on [Youtube](" + input + ")";
};

var json = [
    { h1: "" },
    { linkToVideo: URL }
];

console.log(json2md(json));
