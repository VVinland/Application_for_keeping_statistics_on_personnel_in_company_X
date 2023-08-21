import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
dotenv.config();
const PORT = Number(process.env.PORT || 8080);
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);
const start = () => {
    app.listen(PORT, "localhost", () => {
        console.log(`Server started on PORT = ${PORT}`);
    });
};
start();
