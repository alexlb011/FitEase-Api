import jwt from 'jsonwebtoken';
import geoip from "geoip-lite";
import User from '../models/User';
import { json } from 'sequelize';

export default async (req, res, next) => {

    const { authorization } = req.headers;

    console.log("teste");

    if (!authorization) {
        return res.status(401).json({
            errors: ['Login Required!']
        });
    }

    const [, token] = authorization.split(' ');

    try {

        const dados = jwt.verify(token, process.env.TOKEN_SECRET);
        const { id, email } = dados;
        const user = await User.findOne({
            where: {
                id,
                email,
            },
        });
        if (!user) {
            return res.status(401).json({
                errors: ['Usuario Invalido']
            });
        }

        req.userId = id;
        req.userEmail = email;

        const requestIp = require('request-ip');
        const ip = requestIp;

        const geo = geoip.lookup(ip);

        console.log("---------------------------");
        console.log('UserEmail:', req.userEmail);
        console.log('UserID:', req.userId);

        if (geo) {
            console.log({
                ip: ip,
                county: geo.country,
                city: geo.city
            });

        } else {
            console.log(`IP: ${ip}, Localização desconhecida`);
        }
        console.log("---------------------------");
        return next();

    } catch (error) {

        return res.status(401).json({
            errors: ['Tokin expirado ou invalido']
        });

    }

};