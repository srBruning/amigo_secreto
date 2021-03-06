require("dotenv-safe").config();
const path = require('path');
const cors = require('cors')
const jwt = require('jsonwebtoken');

const express = require('express');
const app = express();
require('./app/database');
const routes = require('./routes');

routes.use('/', express.static('public'));
 
app.use(express.json());
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  allowedHeaders: "*",
}
app.use(cors(corsOptions));
app.options('/api/*', cors(corsOptions)) // include before other routes


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, x-access-token');
    next();
  });

app.use(routes);
app.use(
  "/files", 
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);


// redirecionar 404 quando não for api
routes.get("*", function (req, res, next) {
  if (!req.path || req.path.startsWith("/api") || req.path === "/") {
    res.status(404).send({ message: "Nenhum grupo encontrado" });
  } else res.redirect("/");
});



app.listen(process.env.PORTA);
