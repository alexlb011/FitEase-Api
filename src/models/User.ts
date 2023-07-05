
import { Model, Optional, DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize/types';
import bcryptjs from 'bcryptjs';


class User extends Model {
    public id?: number | undefined;
    public name!: string;
    public email!: string;
    public password_hash: string;
    public password: string;

    public static initModel(sequelize: Sequelize) {

        User.init({

            name: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: '',
                validate: {
                    len: {
                        args: [4, 255],
                        msg: 'Deve ter entre 4 e 255 caracteres!'
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    name: 'Email',
                    msg: 'Email ja existe'
                },
                validate: {

                    isEmail: {
                        msg: 'Email invalido!'
                    }
                }
            },
            password_hash: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            password: {
                type: DataTypes.VIRTUAL,
                allowNull: false,
                validate: {
                    len: {
                        args: [6, 50],
                        msg: 'Deve ter entre 6 e 50 caracteres!'
                    }
                }
            }
        },
            {
                sequelize
            });


        this.addHook('beforeSave', async User => {
            if (User.dataValues.password)
                User.dataValues.password_hash = await bcryptjs.hash(User.dataValues.password, 8);
        });



        return this;

    }


    passwordIsValid(password) {

        return bcryptjs.compare(password, this.password_hash);

    }
    public static associate(models) {

    }


}





export default User;

