const fs = require("fs");
const http = require("http");
const url = require("url");
const axios = require("axios")


const urlSuppliers = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const urlCustomers = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";


function getSuppliers() {
  return axios.get(urlSuppliers);
}

function getCustomers() {
  return axios.get(urlCustomers);
}

function createSuppliersTBody(list){
  let tbody = "";
  for(let key in list){
    let element = list[key];
    let id = element.idproveedor;
    let name = element.nombrecompania;
    let contact = element.nombrecontacto;
    let tr = `<tr> \n
                <th scope='row'> ${id}</th> \n
                <td> ${name}</td> \n
                <td> ${contact}</td> \n
              </tr> \n`;
    tbody+=tr;
  }
  return tbody;
}

function createCustomersTBody(list){
  let tbody = "";
  for(let key in list){
    let element = list[key];
    let id = element.idCliente;
    let name = element.NombreCompania;
    let contact = element.NombreContacto;
    let tr = `<tr> \n
                <th scope='row'> ${id}</th> \n
                <td> ${name}</td> \n
                <td> ${contact}</td> \n
              </tr> \n`;
    tbody+=tr;
  }
  return tbody;
}

http.createServer((req, res) =>{

  let q = url.parse(req.url, true);

  if(q.pathname == "/api/proveedores"){
    getSuppliers().then( (msg) => {
      let suppliers = msg.data;
      fs.readFile('index.html', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end(err);
          return;
        }
        data = data.toString();
        data = data.replace(/\{\{title\}\}/, 'Listado de Proveedores');
        data = data.replace(/\{\{table\}\}/, createSuppliersTBody(suppliers) );
        res.end(data,'utf-8');
      })
    });
  }
  else if(q.pathname == "/api/clientes"){
    getCustomers().then( (msg) => {
      let customers = msg.data;
      fs.readFile('index.html', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end(err);
          return;
        }
        data = data.toString();
        data = data.replace(/\{\{title\}\}/, 'Listado de Clientes');
        data = data.replace(/\{\{table\}\}/, createCustomersTBody(customers) );
        res.end(data,'utf-8');
      })
    });
  }else{
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      data = data.toString();
      data = data.replace(/\{\{title\}\}/, "Not Found");
      data = data.replace(/\{\{table\}\}/, "");
      res.write(data, "utf-8");
      return res.end();
    }); 
  }
  

}).listen(8081);

