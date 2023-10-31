import express from "express";
import DB from "./db.js";
import dotenv from 'dotenv';

dotenv.config();
const server = express();
const db = new DB();

server.use(express.json());

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    next();
  });

  server.get("/", (req, res) => {
    try {
      return res.send(`Servidor está rodando...`);
    } catch (err) {
      return res.send(err);
    }
  });

  db.handleCreateTable().then(() => {
    db.setarRequester();
  });