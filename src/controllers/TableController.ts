import multer from 'multer';
import multerConfig from "../config/multerConfig";
import Table from '../models/Table';
import Students from '../models/Students';

const upload = multer(multerConfig).single('photo');


class TableController {


    async index(req, res) {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                erros: ['Missing ID!']
            });
        }

        const tables = await Students.findByPk(id, {
            attributes: [],
            order: [['id', 'DESC'], [Table, 'id', 'DESC']],
            include: {
                model: Table, attributes: ["id", "tablename", "columfield"],
            }

        });


        return res.json(tables);

    }

    async store(req, res) {

        return console.log('tudo no update agora');

    }

    async edit(req, res) {

        const { id } = req.params;
        if (!id) { return res.status(400).json({ erros: ['Missing something!'] }); }

        const students_id = id;
        const arrayTables = req.body;
        const oldAllTable = await Table.findAll({ where: { students_id } });


        await oldAllTable.map(async (currentTable: Table) => {
            await currentTable.destroy();
        });

        await arrayTables.map(async item => {
            const tablename = item.tablename;
            const columfield = item.columfield;

            await Table.create({ tablename, columfield, students_id });

        });

        return res.json('foi');
    }

    async delete(req, res) {
        res.json('nao ainda');
    }
}

export default new TableController();