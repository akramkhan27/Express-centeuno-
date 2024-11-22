// create to do app , where user can do simple task add, update, delete and find

import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";

const app=express();

app.use(bodyParser.json());

app.use("/Users", userRoutes);

const PORT = process.env.PORT || 3000;

import sequelize from "./config/database.js"
sequelize.sync().then(()=>{
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}).catch((e)=>{
    console.log(e);
})
