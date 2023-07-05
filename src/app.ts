import dotenv from "dotenv";
dotenv.config();
import { resolve } from 'path';
import './database';

import express from "express";
import cors from 'cors';
import homeRoutes from "./routes/homeRoutes";
import UserRoutes from "./routes/UserRoutes";
import TableRoutes from "./routes/TableRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import PhotoRoutes from "./routes/PhotoRoutes";
import tokenRoutes from "./routes/tokenRoutes";

const witheList = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://fitease.netlify.app'
];
const corsOptions = {
    origin: function (origin, callback) {
        if (witheList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS!'));
        }
    }
};
const requestIp = require('request-ip');

class App {

    app = express();

    constructor() {
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors(corsOptions));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(requestIp.mw());
        this.app.use(express.json());
        this.app.use('/images', express.static(resolve(__dirname, '..', 'uploads', 'images')));
    }

    routes() {
        this.app.use("/", homeRoutes);
        this.app.use("/users/", UserRoutes);
        this.app.use("/table/", TableRoutes);
        this.app.use("/students/", StudentRoutes);
        this.app.use("/photo/", PhotoRoutes);
        this.app.use("/tokens/", tokenRoutes);
    }
}

export default new App().app;