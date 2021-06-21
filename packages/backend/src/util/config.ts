import { createSecretKey } from "crypto";
import swaggerUi from "swagger-ui-express";
import EmailService from "./email";

export const emailService = new EmailService();
export const swaggerDocs = swaggerUi.generateHTML(import("../swagger.json"))
export const secretKey = createSecretKey(Buffer.from(process.env.JWT_SECRET, 'base64'))