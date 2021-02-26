const fs = require("fs");
const http = require("http");
const axios = require("axios")

const urlProveedores = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const urlCliente = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

// Make a request for a user with a given ID
axios.get(urlProveedores)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });


const getFileContent = (callback) => {
fs.readFile("index.html", (err, data) => {
    callback(data.toString);
})};

http.createServer((req, res) =>{
    getFileContent((data) => {
        res.end(data)
    })
}).listen(8000);

