const fs = require("fs");
const http = require("http");
const axios = require("axios")


const getFileContent = (callback) => {
fs.readFile("index.fs", (err, data) => {
    callback(data.toString);
})};

http.createServer((req, res) =>{
    getFileContent((data) => {
        res.end(data)
    })
}).listen(8000);

