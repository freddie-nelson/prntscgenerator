const http = require("https");
const fetch = require("node-fetch");
const datauri = require("datauri");

const hostname = "127.0.0.1";
const port = 443;

const server = https.createServer(async (req, res) => {
  // Set CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', req.headers.origin);

  res.statusCode = 200;

  const imageURL = req.url.substring(1, req.url.length);
  let response;

  if (imageURL.includes(".png")) {
    res.setHeader("Content-Type", "image/png");
    response = await (await fetch(imageURL)).buffer()
  } else {
    res.setHeader("Content-Type", "text/html");
    response = await (await fetch(imageURL)).text();
  }

  res.end(response);
});

server.listen(port, hostname, () => {
  console.log(`Server running at https://${hostname}:${port}/`);
});
