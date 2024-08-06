import mongoose from "mongoose";
import config from "./config/config.js";
import logger from "./config/logger.js";
import { server } from "./app.js";

mongoose.connect(config.mongoose.url).then(() => {
   logger.info("Connected to MongoDB");
   server.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
   });
});

const exitHandler = () => {
   if (server) {
      server.close(() => {
         logger.info("Server closed");
         process.exit(1);
      });
   } else {
      process.exit(1);
   }
};

const unexpectedErrorHandler = (error) => {
   logger.error(error);
   exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
   logger.info("SIGTERM received");
   if (server) {
      server.close();
   }
});
