let exp=require('express')
let bd=require('body-parser')

let app=exp()
app.use(bd.json({extended:true}))
app.use(bd.urlencoded({extended:true}))

app.get("/",(req, res)=>{
    res.send({msg:"welcome"})
})
app.get("/home/:pid",(req, res)=>{
    let t=req.params.pid
    res.send({msg:"welcome", data:t})
})
app.get("/data",(req, res)=>{
    
    res.send({msg:"welcome", data:req.query})
})
app.post("/reg",(req, res)=>{
    
    res.send({msg:"welcome", data:req.body})
})

app.listen(9000)