import { createSecretKey } from "crypto";
import EmailService from "./email";

export const emailService = new EmailService();
export const secretKey = createSecretKey(Buffer.from(process.env.JWT_SECRET, 'base64'))