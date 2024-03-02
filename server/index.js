 const express = require('express')

 const app = express()

const cors = require('cors')

const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const User = require('./model/UserSchema.js')
// mongoose connection-string

main().catch(err => console.log(err))

async function main(){
    await mongoose.connect("")
    console.log('db connected')
}

app.use(cors())
app.use(bodyParser.json())

 // api set-up
app.post('/api/form', async function(req,res){

    let user = new User();
    user.firstname = req.body.firstname
    user.lastname = req.body.lastname
    user.gender= req.body.gender
    user.bloodgroup=req.body.bg
    user.disease=req.body.disease
    const document =  await user.save()
    console.log(document)
    res.json(document)
    // console.log(req.body)
})


// Getting the saved data
app.get('/api/form',async function(req,res){
   const document= await  User.find({})
   console.log(document)
   res.json(document)
})

 app.listen(8000,() =>{
    console.log('Server started!')
 })