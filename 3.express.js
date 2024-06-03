const express = require("express");
const path = require("node:path");
const dittoJSON = require(path.join(__dirname, "pokemon", "ditto.json"));

const PORT = process.env.PORTS || 3000;
const app = express();
app.disable("x-powered-by");

// Middleware
/*
app.use((req, res, next) => {
  console.log("----> Request received");

  if (req.method === "GET") return next();
  if (req.header["content-type"] === "application/json") return next();

  // solo llegan request que son POST y que tengan el header content-type json
  let body = "";

  // escuchar el evento data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  // escucha cuando finalizan los eventos de carga
  req.on("end", () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    data.author = "Jeniffer Orjuela";

    // mutar la request y meter la informacion en el req.body
    req.body = data;
    next();
  });
}); */

// hace lo mismo que el MIDDLEWARE anterior pero propio de express
app.use(express.json());

app.get("/pokemon/ditto", (req, res) => {
  // res.status(200).send("<h1>Hello World</h1>");
  res.json(dittoJSON); // Pasar datos como json a la página
});

app.post("/pokemon", (req, res) => {
  // **
  // Se pasan todo este proceso al ------> middleware
  // let body = "";
  // escuchar el evento data
  // req.on("data", (chunk) => {
  //  body += chunk.toString();
  // });

  // escucha cuando finalizan los eventos de carga
  // req.on("end", () => {
  //  const data = JSON.parse(body);
  //  data.timestamp = Date.now();
  //  res.status(201).json(data);
  // });
  // **

  res.status(201).json(req.body);
});

// La ultima a la que va a llegar
app.use((req, res) => {
  res.status(404).send("<h1>Not found</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
