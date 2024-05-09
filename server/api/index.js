require("dotenv").config();
const express = require("express");
const axios = require("axios");
const helmet = require("helmet");
const cors = require("cors");

const authorization = process.env.AUTHORIZATION;
const clientId = process.env.CLIENT_ID;

const app = express();
app.use(helmet());
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Client-ID",
  ],
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) =>
  res.send("Express on Vercel")
);

app.listen(PORT, () =>
  console.log(`Server ready on port ${PORT}.`)
);

app.post("/api/games", async (req, res) => {
  try {
    const {
      fields,
      where,
      limit,
      offset,
      sort,
      search,
    } = req.body;

    let query = `fields ${fields}; where ${where}; limit ${limit}; offset ${offset};`;
    if (search && search.length > 0) {
      query += ` search "${search}";`;
    } else {
      query += ` sort ${sort};`;
    }
    const headers = {
      Accept: "application/json",
      Authorization: authorization,
      "Client-ID": clientId,
    };

    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      query,
      {
        headers,
      }
    );

    res.status(201).json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error" });
  }
});

app.post("/api/details", async (req, res) => {
  try {
    const { fields, where } = req.body;

    let query = `fields ${fields}; where ${where};`;
    const headers = {
      Accept: "application/json",
      Authorization: authorization,
      "Client-ID": clientId,
    };

    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      query,
      {
        headers,
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: error.message });
  }
});

module.exports = app;
