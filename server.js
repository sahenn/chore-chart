// Tiny zero-dependency static server for the chore chart.
// Serves index.html for every request; Railway sets PORT.
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const page = path.join(__dirname, "index.html");

http
  .createServer((req, res) => {
    if (req.url === "/healthz") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("ok");
      return;
    }
    fs.readFile(page, (err, buf) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Could not read index.html");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(buf);
    });
  })
  .listen(port, () => console.log(`Chore chart running on port ${port}`));
