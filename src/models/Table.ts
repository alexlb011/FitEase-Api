
import { Model, Optional, DataTypes, VirtualDataType } from 'sequelize';
import config from '../config/config';
import Students from './Students';
import { Sequelize } from 'sequelize/types';
import { VIRTUAL } from 'sequelize';
import { VirtualType } from 'mongoose';


interface ColumUnity {
    title: string;
    set: number;
    rep: number;
    weight: number;
    describe: string;
    youtubepath: string;

}

interface TableAttributes {
    id?: number;
    students_id?: number;
    tablename: string;
    columfield?: ColumUnity[];
}


export default class Table extends Model<TableAttributes> implements TableAttributes {


    public id?: number | undefined;
    public students_id?: number | undefined;
    public tablename: string;
    public columfield?: ColumUnity[] | undefined;


    public static initModel(sequelize: Sequelize) {

        Table.init({
            tablename: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'campo nao pode ficar vazio'
                    }
                }
            },

            columfield: {
                type: DataTypes.JSON,
                allowNull: true,
            }



        }, {

            sequelize,
            tableName: 'tables'
        });


        return this;
    }


    static associate(models) {

        this.belongsTo(models.Students, { foreignKey: 'students_id' });


    }

}








