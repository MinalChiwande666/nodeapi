import express from 'express'
import mongoose from 'mongoose';


const uri = "mongodb://adminUser:yourSecurePassword@52.66.237.139:27017/test?authSource=admin";


const app = express()


app.use(express.json())
const userSchema = new mongoose.Schema({
    name:String,
    age:Number
})

const User = mongoose.model('User',userSchema)

const connection = async()=>{
    try{
        await mongoose.connect(uri)
      
        console.log('connected')

    }catch(e)
    {
        throw new Error(e)
    }
}

app.get('/',async (req,res)=>{
    const users = await User.find()
    res.send(users)
})

app.post('/postdata',async(req,res)=>{
    const {name,age} = req.body
    const saveuser = new User({
        name,
        age
    })

    await saveuser.save()
    res.json({message:'Saved user'})
})

app.listen(5000,()=>{
    connection()
    console.log('server running....')
})