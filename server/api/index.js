require("dotenv").config();
const express = require("express");
const axios = require("axios");
const helmet = require("helmet");
const cors = require("cors");

const authorization = process.env.AUTHORIZATION;
const clientId = process.env.CLIENT_ID;
const originLink = process.env.ORIGIN;
const apiCall = process.env.API_URL;

const app = express();
app.use(helmet());
const PORT = process.env.PORT;

const corsOptions = {
  origin: originLink,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization", "Client-ID"],
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => res.send("Express on Vercel"));
app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

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
      Authorization: authorization,
      "Client-ID": clientId,
    };

    console.log("=== REQUEST DEBUG ===");
    console.log("Query:", query);

    const response = await axios.post(`${apiCall}`, query, {
      headers,
    });

    res.status(201).json(response.data);
  } catch (error) {
    console.error("=== ERROR DEBUG ===");
    console.error("Error message:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response data:", JSON.stringify(error.response.data, null, 2));
    }
    if (error.request && !error.response) {
      console.error("No response received. Request:", error.request);
    }
    res.status(500).json({
      error: "Internal server error",
      details: error.response?.data || error.message,
    });
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

    const response = await axios.post(`${apiCall}`, query, {
      headers,
    });

    res.json(response.data);
  } catch (error) {
    console.error("=== DETAILS ERROR ===");
    console.error("Error message:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response data:", JSON.stringify(error.response.data, null, 2));
    }
    res.status(500).json({
      error: error.message,
      details: error.response?.data,
    });
  }
});

module.exports = app;
