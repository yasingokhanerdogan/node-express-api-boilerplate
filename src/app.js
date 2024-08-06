import express from "express";
import bodyParser from "body-parser";
import { createServer } from "node:http";
import { Server } from "socket.io";

import cors from "cors";
import helmet from "helmet";
import httpStatus from "http-status";

import config from "./config/config.js";
import morgan from "./config/morgan.js";
import routes from "./routes/v1/index.js";

import { errorConverter, errorHandler } from "./middlewares/error.js";
import ApiError from "./utils/apiError.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.options("*", cors());

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (config.env !== "test") {
   app.use(morgan.successHandler);
   app.use(morgan.errorHandler);
}

app.use("/v1", routes);

app.use((req, res, next) => {
   next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);
app.use(errorHandler);

export { app, server, io };
