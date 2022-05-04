import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* SERVER CONFIG */
export const dev = process.env.NODE_ENV !== 'production';

export const HOST_NAME = process.env.HOST_NAME || 'localhost';
export const APP_PORT = process.env.APP_PORT || 3000;
export const DBURI =process.env.DBURI || '';
