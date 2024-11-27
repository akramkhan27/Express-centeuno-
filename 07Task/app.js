import express from "express";
import bodyParser from "body-parser";
import router from "./routes/route.js"
import sequelize from "./config/database.js";

const port= process.env.PORT;
const app= express();

app.use(bodyParser.json())

app.use("/app",router);

sequelize.sync().then(()=>{
    app.listen(port, ()=>{
        console.log(`Listening on port : ${port}`);
    })
}).catch((e)=>{
    console.log(e);
})

