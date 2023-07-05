import { Sequelize } from "sequelize";
import Students from "../models/Students";
import User from "../models/User";
import Photo from "../models/Photo";
import Table from "../models/Table";

const models = [User, Students, Photo, Table];

const conection = new Sequelize({

    dialect: 'mariadb',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,

    define: {

        timestamps: true,
        underscored: true,
        'createdAt': 'created_at',
        'updatedAt': 'updated_at'
    }
});


models.forEach((model) => model.initModel(conection));
models.forEach((model) => model.associate && model.associate(conection.models));


