const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const app = express();

require("dotenv").config();

const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./config/db");

// Connect Database
connectDB();

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";
const doSCGController = require("./controllers/DOSCG");

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  await nuxt.ready();
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // JSON Parser
  // app.use(express.json());
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname, "client")));

  app.get("/api/xyz", doSCGController.findXYZ);
  app.get("/api/findBC", doSCGController.findBC);
  app.get("/api/googleAPI", doSCGController.connectGoogleAPI);
  app.post("/api/line", doSCGController.lineMessageAPI);
  app.post("/api/saveDevice", doSCGController.creteDeviceSubscribe);

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
