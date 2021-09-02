const express = require('express')
const app = express()
const Joi = require('joi')
function uservalidate(res){
    const schema={
        name:Joi.string().min(3).required()
    }
    return Joi.validate(res, schema)
}
const user=[
    {
        id:1,
        name:"hilal"
    },
    {
        id:2,
        name:"hashim"
    }
]

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.get('/api/user',(req,res)=>{
    res.send(user)
})

app.post('/api/user',(req,res)=>{

    const schema={
        name:Joi.string().min(3).required()
    }
    const result= Joi.validate(req.body, schema)
    if(result.error){
        res.status(404).send(result.error.details[0].message);
        return;
    }
    const addUser={
        id:user.length+1,
        name:req.body.name
    }
    user.push(addUser)
    res.send(user)
})

app.get('/api/user/:id',(req,res)=>{
    const response = user.find(r=> parseInt(req.params.id)===r.id)
    if(!response) res.status(404).send("entered id caant be found in the user section")
    res.send(response)
})

app.put('/api/user/:id',(req,res)=>{
    const response = user.find(r=> parseInt(req.params.id)===r.id)
    if(!response) {res.status(404).send("entered id caant be found in the user section")
    return;
}
    
    const result= uservalidate(req.body)

    if(result.error){
        res.status(404).send(result.error.details[0].message);
        return
    }
    response.name=req.body.name
    res.send(response)
})

app.delete('/api/user/:id',(req,res)=>{
    const response = user.find(r=> parseInt(req.params.id)===r.id)
    if(!response){
     res.status(404).send("entered id caant be found in the user section")
     return;
    }
    let index= user.indexOf(response)
    user.splice(index,1)
    res.send(user)
})

const port= process.env.PORT || 3000

app.listen(port,(result)=>{
    console.log("server is running at "+port);
})