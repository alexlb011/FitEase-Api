
import User from "../models/User";

class UserController {

    //store/create -> cria um novo usuario ->post
    async store(req, res) {

        try {

            const novoUser = await User.create(req.body);
            const { id, name, email } = novoUser;
            res.json([id, name, email]);

        } catch (error) {
            console.log(error);

            res.status(400).json({
                erros: error.errors.map((err) => err.message)
            });

        }
    }

    //index -> lista todos os usuarios! -> get
    async index(req, res) {

        try {

            const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
            return res.json(users);

        } catch (error) {

            console.log(error);
            return res.status(400).json({

                erros: error.errors.map((err) => err.message)
            });

        }
    }
    //show -> mostra um usuario -> Get
    async show(req, res) {

        try {


            const user = await User.findByPk(req.params.id);

            if (!user) {
                return res.status(400).json({
                    erros: 'Usuario nao encontrado'
                });
            }

            const { id, name, email } = user;
            return res.json({ id, name, email });

        } catch (error) {

            return res.status(400).json({
                erros: error.errors.map((err) => err.message)
            });

        }
    }
    //update -> atualiza um usuario - >patch ou put
    async update(req, res) {

        try {

            // const id = req.params.id;
            const user = await User.findByPk(req.userId);

            if (!user) {
                return res.status(400).json({
                    errors: ['ID nao econtrado!']
                });
            }

            const newData = await user.update(req.body);
            const { id, name, email } = newData;
            return res.json([id, name, email]);

        } catch (error) {

            return res.status(400).json({
                erros: error.errors.map((err) => err.message)
            });

        }
    }
    //delete -> apaga um usuario! -> delete
    async delete(req, res) {

        try {

            const id = req.params.id;
            const user = await User.findByPk(id);

            if (!id || !user) {
                return res.status(400).json({
                    errors: ['ID nao econtrado!']
                });
            }

            await user.destroy();
            return res.json('Usuario Deletado');

        } catch (error) {

            return res.status(400).json({
                erros: error.errors.map((err) => err.message)
            });

        }
    }
}

export default new UserController();