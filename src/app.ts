import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server with nodemon!');
});


export default app