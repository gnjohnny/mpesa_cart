import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';

import { connectDb } from './db/db.js';

import mpesaRoutes from './routes/mpesa.routes.js';

const app = express();
const PORT = process.env.PORT || 2001;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_URl,
        credentials: true,
    }),
);

app.use('/api/mpesa', mpesaRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDb();
});
