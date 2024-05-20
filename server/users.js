import { pool } from "../db/run.js";
import express from 'express';
import {sha512} from "js-sha512";

// let str = "hello"
// let secretKey = "MYSECRETKEY"

// let hash = sha512.hmac(secretKey, str);

export const app = express.Router(); // Exporting app as Router

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/login', (req, res) =>
{
    const id=req.body.id;
    const reqPassword=req.body.password;
    const reqHash=sha512.hmac(id, reqPassword);
    //get user from database and userHash
    passwordHash==reqHash?res.send(user):res.send("failure");
}); 