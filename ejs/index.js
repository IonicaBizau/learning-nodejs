const ejs = require('ejs');
var str = `<% posts.forEach(function (c) { -%>
    <%= c -%>
s are great
<% }) %>`;

console.log(ejs.render(str, {
    posts: ["Apple", "Pear", "Orange"]
}));
