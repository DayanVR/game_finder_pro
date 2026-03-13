process.loadEnvFile();

import express from "express";
import axios from "axios";
import helmet from "helmet";
import { corsMiddleware } from "../middlewares/cors.js";

const authorization = process.env.AUTHORIZATION;
const clientId = process.env.CLIENT_ID;
const apiCall = process.env.API_URL;
const PORT = process.env.PORT;

const app = express();
app.use(helmet());

app.use(corsMiddleware());
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
}

app.get("/", (req, res) => res.send("Express on Vercel"));

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

export default app;
