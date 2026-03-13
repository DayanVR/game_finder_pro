import cors from "cors";

const ACCEPTED_ORIGINS = ["http://localhost:3000", "https://game-finder-pro-client.vercel.app"];

const corsOptions = {
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization", "Client-ID"],
};

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors(
    {
      origin: (origin, callback) => {
        if (acceptedOrigins.includes(origin) || !origin) {
          return callback(null, true);
        }

        return callback(new Error("Origen no permitido"));
      },
    },
    corsOptions,
  );
};
