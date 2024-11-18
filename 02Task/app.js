const express= require("express");
const app= express();
const port=3000;

app.get("/",(req,res)=>{
    res.send("Response is working");
})

app.listen(port,()=>{
    console.log(`Server is running at PORT: ${port}`);
})