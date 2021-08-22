const express = require('express')
const fs = require('fs');
const html_parser = require('node-html-parser');
const { decycle, encycle } = require('json-cyclic');

const app = express()

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const port = packageJson.setting["port"];

app.post('/parseByQuery/:TAG', (req, res) =>
{
    let html = req.body.html;
    result = html_parser.parse(html);
    parsed_json = JSON.stringify(decycle(result.querySelectorAll(req.params.TAG)));
    res.send(parsed_json);
})

app.use('/',
    (request, response, next) => 
    {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    },
    express.static("./public")
);

app.listen(port, () =>
{
    console.log(`Start server port:${port}`)
})
