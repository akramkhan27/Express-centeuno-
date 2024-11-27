import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const user= sequelize.define("UserSecond",{
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false,
    },
    mobile: {
        type: DataTypes.STRING(10),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(),
        allowNull: false,
    }
})

export default user;