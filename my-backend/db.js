let exp=require('express')
let db=require('mongoose')

let app=exp()
let PORT=2831

db.connect("mongodb://localhost:27017")
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((err)=>{
    console.log("Error connecting to MongoDB",err)
})


let mySchema=new db.Schema({
    name:{type:String,required:true,unique:false},
    age:{type:String,required:true,unique:false},
    phone:{type:String,required:true,unique:true}
})
let myModel=db.model("student",mySchema)

// let student1=new myModel({name:"John",age:"21",phone:"1234567890"})
app.get('/',(req,res)=>{
    res.send("Hello from express")
})
app.get('/reg',async(req,res)=>{
    let {name,age,phone}=req.query
    let student1=new myModel({name,age,phone})
    await student1.save()

    res.send("registered successfully")
})
app.listen(PORT,()=>{
    console.log("Server is running on port ${PORT}")
})