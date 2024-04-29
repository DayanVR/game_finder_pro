import serverless from "serverless-http";
const axios = require("axios");
const express = require("express");
const cors = require("cors");

app.use(cors()); 
app.use(express.json());

exports.handler = async function (event, context) {
  try {
    const { path, fields, where, limit, offset, sort, search } = JSON.parse(
      event.body
    );

    let apiUrl;
    let query;
    if (path === "/games") {
      apiUrl = "https://api.igdb.com/v4/games";
      query = `fields ${fields}; where ${where}; limit ${limit}; offset ${offset};`;
      if (search && search.length > 0) {
        query += ` search "${search}";`;
      } else {
        query += ` sort ${sort};`;
      }
    } else if (path === "/details") {
      apiUrl = "https://api.igdb.com/v4/games";
      query = `fields ${fields}; where ${where};`;
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Endpoint not found" }),
      };
    }

    const headers = {
      Accept: "application/json",
      Authorization: "Bearer xgquzw1xe7xvsaway0v5sih2mbc0yi",
      "Client-ID": "w3digq04cfa0r0n86enjwuwn3ci1hk",
    };

    const response = await axios.post(apiUrl, query, { headers });
    console.log(response.data);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
