var fs = require("fs");
// ssl license

var keyPath = "./server/ssl/mkey.pem",
  certPath = "./server/ssl/mcert.pem";

var hskey = fs.readFileSync(keyPath);
var hscert = fs.readFileSync(certPath);

var options = {
  key: hskey,
  cert: hscert
}

//ssl object
var ssl = {};
ssl.options = options;

module.exports = ssl;