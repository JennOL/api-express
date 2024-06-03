const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const desiredPort = process.env.PORT || 3000;

const processRequest = (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  if (req.url === "/") {
    res.end("<h1>Bienvenido a mi Página de inicio</h1>");
  } else if (req.url === "/contacto") {
    res.end("<h1>Bienvenido a mi Página de Contacto</h1>");
  } else if (req.url === "/pipas") {
    fs.readFile(path.join(__dirname, "src", "pipas.png"), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("<h1>500 Internal Server Error</h1>");
      } else {
        res.setHeader("Content-Type", "image/png");
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404; // Not Found
    res.end("<h1>404</h1>");
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`);
});
