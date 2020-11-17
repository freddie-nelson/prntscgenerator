const fetch = require("node-fetch");
const express = require('express')
const cors = require("cors");
const app = express();

app.use(cors());

const port = process.env.PORT || 3000;
 
app.get('/:link', async (req, res) => {
  console.log("request received");

  const imageURL = req.params.link;
  let response;

  if (imageURL.includes(".png")) {
    res.type("png");
    response = await (await fetch(imageURL)).buffer();
  } else {
    res.type("png");
    response = await (await fetch(imageURL)).text();
  }

  res.send(response);
})
 
app.listen(port, () => {
  console.log("Server listening on port " + port);
})
