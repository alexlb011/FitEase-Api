import Students from "../models/Students";
import Photo from "../models/Photo";
import Table from "../models/Table";
import { Op } from "sequelize";
import Sequelize from "sequelize";


class StudentController {

    async index(req, res) {
        console.log(req.userId);
        try {
            const students = await Students.findAll({
                attributes: [
                    "id",
                    "name",
                    "lastname",
                    "email",
                    "age",
                    "weight",
                    "height",
                ],
                where: {
                    user_id: req.userId
                },
                order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
                include: [


                    { model: Photo, attributes: ["id", "originalname", 'fieldname', 'url'] },
                    { model: Table, attributes: ["id", "tablename", "columfield"] },

                ]

            });
            res.json(students);
        } catch (error) {
        }
    }
    async store(req, res) {

        try {


            const students = await Students.create(req.body);
            return res.json(students);

        }
        catch (error) {
            return res.status(400).json({
                erros: error.errors.map((err) => err.message)
            }
            );
        }

    }
    async update(req, res) {
        try {

            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    erros: ['Missing ID!']
                });
            }

            const students = await Students.findByPk(id);

            if (!students) {
                return res.status(400).json({
                    errors: ['Students nao existe!']
                });
            }
            await students.update(req.body);
            return res.json(Students);

        } catch (error) {
            console.log(error);
            return res.status(400).json({
                erros: error.errors.map((err) => err.message)
            });

        }

    }
    async show(req, res) {

        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    erros: ['Missing ID!']
                });
            }

            const students = await Students.findByPk(id, {
                attributes: [
                    "id",
                    "name",
                    "lastname",
                    "email",
                    "age",
                    "weight",
                    "height",
                ],
                order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
                include: [
                    { model: Photo, attributes: ["id", "originalname", 'fieldname', 'url'] },
                    { model: Table, attributes: ["id", "tablename", "columfield"] },

                ]
            }
            );

            if (!students) {
                return res.status(400).json({
                    errors: ['Students nao existe!']
                });
            }

            return res.json(students);


        } catch (error) {
            return res.status(400).json({
                erros: error.errors.map((err) => err.message)
            });

        }

    }
    async delete(req, res) {


        try {

            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    erros: ['Missing ID!']
                });
            }

            const students = await Students.findByPk(id);

            if (!students) {
                return res.status(400).json({
                    errors: ['Students nao existe!']
                });
            }


            students.destroy();
            return res.json('Students foi deletado');


        } catch (error) {
            return res.status(400).json({
                erros: error.errors.map((err) => err.message)
            });

        }

    }

    async find(req, res) {
        try {
            const { query } = req.params;
            const result = await Students.findAll({
                where: {

                    [Op.and]: [
                        {
                            [Op.or]: [
                                {
                                    name: {
                                        [Op.like]: `%${query}%`
                                    }
                                },
                                {
                                    lastname: {
                                        [Op.like]: `%${query}%`
                                    }
                                },
                                {
                                    email: {
                                        [Op.like]: `%${query}%`
                                    }
                                }
                            ]
                        },

                        Sequelize.literal(`LENGTH('${query}') >= 3`)

                    ]
                },

                attributes: [
                    "id",
                    "name",
                    "lastname",
                    "email",
                    "age",
                    "weight",
                    "height",
                ],
                // order: [['id', 'DESC']],

            });
            if (!result) {
                return res.status(400).json({
                    errors: ['Students nao existe!']
                });
            }


            return res.json(result);

        } catch (error) {
            console.log(error);
            return res.status(400).json({

                // erros: error.errors.map((err) => err.message)
            });
        }
    }
}

export default new StudentController();