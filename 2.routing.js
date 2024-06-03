const http = require("node:http");
const path = require("node:path");

// commonJS --> modulos clásicos de node
const dittoJSON = require(path.join(__dirname, "pokemon", "ditto.json"));

const processRequest = (req, res) => {
  const { method, url } = req;
  switch (method) {
    case "GET":
      switch (url) {
        case "/pokemon/ditto":
          res.setHeader("Content-Type", "application/json; charset=utff-8");
          return res.end(JSON.stringify(dittoJSON));

        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          return res.end("<h1>404</h1>");
      }
    case "POST":
      switch (url) {
        case "/pokemon": {
          let body = "";

          // escuchar el evento data
          req.on("data", (chunk) => {
            body += chunk.toString();
          });

          // escucha cuando finalizan los eventos de carga
          req.on("end", () => {
            const data = JSON.parse(body);
            data.timestamp = Date.now();

            res.writeHead(201, {
              "Content-Type": "application/json; charset=utf-8",
            });
            res.end(JSON.stringify(data));
          });

          return;
        }

        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          return res.end("404 Not Found");
      }

    default:
      res.end("Method not allowed");
  }
};

const server = http.createServer(processRequest);

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
