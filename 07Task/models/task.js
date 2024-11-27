import { DataTypes } from "sequelize";
import user from "./user.js";
import sequelize from "../config/database.js";

const task= sequelize.define("task",{
    taskTitle:{
        type: DataTypes.STRING,
        allowNull: false
    },
    taskDetail:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER,
        references:{
            model: user,
            key:'id'
        }
    }
})
console.log("task");

user.hasMany(task, { foreignKey: 'userId'});
task.belongsTo(user, { foreignKey: 'userId'});

export default task;