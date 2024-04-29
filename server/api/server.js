const express = require("express");
const axios = require("axios");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post("/api/games", async (req, res) => {
  try {
    const { fields, where, limit, offset, sort, search } = req.body;

    let query = `fields ${fields}; where ${where}; limit ${limit}; offset ${offset};`;
    if (search && search.length > 0) {
      query += ` search "${search}";`;
    } else {
      query += ` sort ${sort};`;
    }
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer xgquzw1xe7xvsaway0v5sih2mbc0yi",
      "Client-ID": "w3digq04cfa0r0n86enjwuwn3ci1hk",
    };

    const response = await axios.post("https://api.igdb.com/v4/games", query, {
      headers,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/details", async (req, res) => {
  try {
    const { fields, where } = req.body;

    let query = `fields ${fields}; where ${where};`;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer xgquzw1xe7xvsaway0v5sih2mbc0yi",
      "Client-ID": "w3digq04cfa0r0n86enjwuwn3ci1hk",
    };

    const response = await axios.post("https://api.igdb.com/v4/games", query, {
      headers,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;
module.exports.handler = serverless(app);

/*app.use("/.netlify/functions/server", app);
export const handler = serverless(app);*/

/*app.listen(PORT, () => {
  console.log(`Proxy server is running`);
});*/
