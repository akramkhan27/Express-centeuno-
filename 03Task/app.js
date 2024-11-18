const express= require("express");
const app=express();
const port=3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.send(`
        <form action="/toUpperCase" method="POST">
        <label for="text">Enter the Text : </label>
        <input type="text" id="text" name="text">
        <br>
        <button type="submit">Submit</button>
        </form>
    `)
})
app.post("/toUpperCase",(req,res)=>{
    let text=req.body.text;
    text=text.toUpperCase();
    res.send(`
        <p>Converted Text into Uppercase :  : ${text}</p>
    `)
})

app.listen(port,()=>{
    console.log(`Server is running at PORT: ${port}`);
})