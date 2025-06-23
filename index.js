const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/Employee')
const TodoModel = require('./models/Todo')

const app = express()
app.use(express.json())

app.use(cors({
    origin:["http://localhost:5173"],
    methods: ["GET", "POST", "PUT","UPDATE","DELETE"],
    credentials:true
}))


const connection=()=>{
    mongoose.connect('mongodb+srv://rashmi:rashmi123@cluster0.pszpa.mongodb.net/employees?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
        console.log("Db Connected");

    }).catch((error)=>{
       console.log(error);
    })
    
}
connection();


app.post("/login", (req, res)=>{
    const {email, password} = req.body;
    EmployeeModel.findOne({email:email})
    .then(user =>{
        if(user) {
            if(user.password === password) {
                res.json("Success")
            }else{
                res.json("the password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
})

app.post('/register', (req, res) =>{
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})
app.get('/get', (req, res)=>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
app.put('/update/:id', (req, res) =>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done:true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
app.delete('/delete/:id', (req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))


})

app.post('/add', (req, res) =>{
    const task = req.body.task;
    TodoModel.create({
        task:task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})




app.listen(3001, ()=>{
    console.log("server is running")
})