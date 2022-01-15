"use strict";

const fs = require("fs");

module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    https: {
      key: fs.readFileSync(`./localhost-key.pem`),
      cert: fs.readFileSync(`./localhost.pem`)
    },
    hotOnly: true
  }
};
