// functions/api.js
const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const { path, body } = JSON.parse(event.body);

    let apiUrl;
    if (path === "/games") {
      apiUrl = "https://api.igdb.com/v4/games";
    } else if (path === "/details") {
      apiUrl = "https://api.igdb.com/v4/games";
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

    const response = await axios.post(apiUrl, body, { headers });

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
