import { pool } from "../db/run.js";
import express from 'express';

export const app = express.Router(); // Exporting app as Router

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/login', (req, res) =>
{
    const id=req.body.id;
    
}); //