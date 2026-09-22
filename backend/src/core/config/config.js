import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;

export const MONGODB_URI = process.env.MONGODB_URI;
export const NODE_ENV = process.env.NODE_ENV;

export const JWT_SECRET = process.env.JWT_SECRET;

export const FRONTEND_URL = process.env.FRONTEND_URL;

export const API_PREFIX = "/api";