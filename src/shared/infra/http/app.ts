/* eslint-disable import/export */
import "reflect-metadata";

import "dotenv/config";

import "@shared/container";

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import { tmpDirectoriesUploadConfig } from "@config/upload";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";

import swaggerFile from "../../../swagger.json";
import { AppError } from "../../errors/AppError";
import { router } from "./routes";

export const app = express();

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),

        new Tracing.Integrations.Express({ app }),
    ],

    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());

app.use(rateLimiter);

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

// app.use("/files/car", express.static(tmpDirectoriesUploadConfig.car.directory));

app.use(
    "/files/avatar",
    express.static(tmpDirectoriesUploadConfig.avatar.directory)
);

app.use(cors());

app.use(Sentry.Handlers.errorHandler());

app.use(
    Sentry.Handlers.errorHandler({
        shouldHandleError(error) {
            // Capture all 404 and 500 errors
            if (error.status === 429 || error.status === 500) {
                return true;
            }
            return false;
        },
    })
);

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }
        return response.status(500).json({
            status: "error",
            message: `Internal server - error: ${err.message}`,
        });
    }
);
