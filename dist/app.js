import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server with nodemon!');
});
export default app;
