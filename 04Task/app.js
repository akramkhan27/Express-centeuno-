// create simple api which send body with using post and assign the body value in some json file

const express= require("express");
const joi= require("joi");
const path= require("path");
const fs= require("fs");

const app =express();
const port =3000;

app.use(express.json());

const schema= joi.object({
    username : joi.string().alphanum().min(3).max(10).required(),
    email : joi.string().email().pattern(/^[a-zA-z0-9._]+\@gmail\.com$/).required(),
    phone: joi.string().pattern(/^[0-9]{10}$/).required(),
    employeeId : joi.string().alphanum()
})

const filePath= path.join(__dirname,"users.json");

app.post("/user/create", (req,res)=>{
    const {error, value}= schema.validate(req.body);
    if(error){
        return res.status(400).json({error : error.details[0].message})
    }
    const user=value;

    let users=[];

    if(fs.existsSync(filePath)){
        const fileData=fs.readFileSync(filePath,"utf-8");
        users=JSON.parse(fileData || "[]");
    }
    users.push(user);

    fs.writeFileSync(filePath, JSON.stringify(users));

    return res.status(200).json({message : "Data Insertion Successfully", user});
})

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})