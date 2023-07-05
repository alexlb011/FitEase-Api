
import { Model, Optional, DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize/types';

class Students extends Model {
    public id?: number | undefined;
    public user_id?: number | undefined;
    public name!: string;
    public lastname!: string;
    public email!: string;
    public age!: number;
    public weight!: number;
    public height!: number;

    public static initModel(sequelize: Sequelize) {

        Students.init({

            name: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'Nome precisa ter entre 3 e 255 caracteres'
                    }
                }

            },
            lastname: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'sobrenome precisa ter entre 3 e 255 caracteres'
                    }
                }

            },
            email: {
                type: DataTypes.STRING,
                defaultValue: '',
                unique: true,
                validate: {
                    isEmail: {
                        msg: 'E-mail invalido!'
                    }
                }

            },
            age: {
                type: DataTypes.INTEGER,
                validate: {
                    isInt: {
                        msg: 'Idade precisa ser um numero interiro'
                    }
                }
            },
            weight: {
                type: DataTypes.FLOAT,
                validate: {
                    isFloat: {
                        msg: 'Peso precisa ser um numero interio ou fracionado'
                    }
                }
            },
            height: {
                type: DataTypes.FLOAT,
                validate: {
                    isFloat: {
                        msg: 'Altura precisa ser um numero interio ou fracionado'
                    }
                }
            },
            user_id: {
                type: DataTypes.INTEGER,
            },
        }, {
            sequelize
        });
        return this;

    }
    public static associate(models) {
        this.hasMany(models.Photo, { foreignKey: 'students_id' });
        this.hasMany(models.Table, { foreignKey: 'students_id' });
        this.belongsTo(models.User, { foreignKey: 'id' });
    }


}

export default Students;
