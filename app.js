import express from 'express';
import bodyParser from 'body-parser';
import { monetaryHelpRouter } from './routes/monetary-help.js';

const app = express();
app.use(bodyParser.json());

app.use(monetaryHelpRouter);

export { app };