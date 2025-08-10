const http = require("http");
const fs = require("fs");
const path = require("path");

const mime = { ".html": "text/html", ".js": "application/javascript" };
http
  .createServer((req, res) => {
    let file = req.url === "/" ? "/worker.html" : req.url;
    let ext = path.extname(file);
    fs.readFile("." + file, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not Found");
        return;
      }
      res.writeHead(200, {
        "Content-Type": mime[ext] || "application/octet-stream",
      });
      res.end(data);
    });
  })
  .listen(3000, () => console.log("Server at http://localhost:3000"));
