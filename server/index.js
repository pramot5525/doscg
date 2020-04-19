const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const app = express();
console.log("init express", process.env.GOOGLE_API);
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
  app.use(express.json());
  app.get("/api/xyz", doSCGController.findXYZ);
  app.get("/api/findBC", doSCGController.findBC);
  app.get("/api/googleAPI", doSCGController.connectGoogleAPI);
  app.get("/api/lineMessageAPI", doSCGController.lineMessageAPI);

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
