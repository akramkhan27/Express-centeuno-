import express from "express";
import router from "./routes/authRoute.js";
import sequelize from "./config/database.js";
import bodyParser from "body-parser";

const port=process.env.PORT;

const app= express();

app.use(bodyParser.json());

app.use("/auth",router);

sequelize.sync().then(()=>{
    app.listen(port,()=>{
        console.log(`Server running at port: ${port}`);
    })
})
.catch((e)=>{
    console.log(e);
})