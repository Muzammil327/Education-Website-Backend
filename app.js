import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// env
dotenv.config();

const app = express();

// app use
app.use(cors({
    origin: [
      "https://education-website-frontend-tawny.vercel.app",
      "http://localhost:3000"
    ]
  }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



export default app;