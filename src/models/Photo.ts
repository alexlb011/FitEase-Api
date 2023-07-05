
import { Model, Optional, DataTypes, VirtualDataType } from 'sequelize';
import config from '../config/config';
import Students from './Students';
import { Sequelize } from 'sequelize/types';
import { VIRTUAL } from 'sequelize';
import { VirtualType } from 'mongoose';




export default class Photo extends Model {

    public id?: number | undefined;
    public students_id?: number | undefined;
    public originalname: string;
    public fieldname: string;
    public url: string;


    public static initModel(sequelize: Sequelize) {

        Photo.init({
            originalname: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'campo nao pode ficar vazio'
                    }
                }
            },
            fieldname: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'campo nao pode ficar vazio'
                    }
                }

            },

            url: {
                type: DataTypes.VIRTUAL,
                get() {
                    return `${config.url}images/${this.getDataValue('fieldname')}`;
                }
            },


        }, {

            sequelize,
            tableName: 'photos'
        });


        return this;
    }


    static associate(models) {

        this.belongsTo(models.Students, { foreignKey: 'students_id' });


    }

}








