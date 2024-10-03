import { createAsyncThunk } from "@reduxjs/toolkit";
import dotenv from "dotenv";
dotenv.config();
const URL = import.meta.env.DATABASE_URL;

console.log("La URL de la base de datos es:", URL);
