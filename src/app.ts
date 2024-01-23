import express, { Express } from 'express';

import 'dotenv/config'
import cors from 'cors'
import errorHandler from './errors/errorHandler';
import notFound from './errors/notFound';
import reservationsRouter from "./reservations/reservations.router"
import tablesRouter from "./tables/tables.router"


const app: Express = express();
app.use(cors())
app.use(express.json())



app.use('/reservations', reservationsRouter);
app.use('/tables', tablesRouter)


app.use(notFound)
app.use(errorHandler)

export default app