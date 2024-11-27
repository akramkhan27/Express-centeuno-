import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const user= sequelize.define("user",{
    username:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
console.log("user");
export default user;