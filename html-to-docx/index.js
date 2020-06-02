const htmlDocxJs = require("html-to-docx")
const fs = require("fs")

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
   <h1>Hello World</h1>
</body>
</html>`;


(async () => {
    const buff = await htmlDocxJs(html, "")
    debugger
    fs.writeFileSync("test1.doc", buff)
})()
