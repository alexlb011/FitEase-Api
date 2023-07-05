import multer from 'multer';
import multerConfig from "../config/multerConfig";
import Photo from '../models/Photo';

const upload = multer(multerConfig).single('photo');


class PhotoController {

    async index(req, res) {
        res.json('index');
    }

    async store(req, res) {
        return upload(req, res, async (erros) => {
            if (erros) {
                return res.status(400).json({
                    erros: [erros.code],
                });
            }

            try {

                const { originalname, filename } = req.file;
                const fieldname = filename;
                const students_id = req.body.aluno_id;
                const photo = await Photo.create({ originalname, fieldname, students_id });
                return res.json(photo);

            } catch (error) {
                return res.status(400).json({
                    erros: ['Aluno nao existe!']
                });

            }


        });
    }
}

export default new PhotoController();