const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config();
const connectDB = require("./utils/db");
const { json } = require("react-router-dom");

const app = express()
app.use(cors())
app.use(express.json({limit: "10mb"}))
connectDB();

const PORT = process.env.PORT || 8080

// mongodb connection

// console.log(process.env.MONGODB_URL)
// mongoose.set('strictQuery', false);
// mongoose.connect(process.env.MONGODB_URL)
// .then(() => console.log("Connected to database"))
// .catch((err) => console.log(err))

// schema

const userschema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true, },
    password: String,
    confirmpassword: String,
    image: String
})

//Model
const usermodel = mongoose.model("user", userschema)
app.get("/", (req,resp)=>{
    resp.send("server is running..!")
})

app.post("/signup", async(req,resp)=>{
    console.log(req.body)
    const {email} = req.body

    try {
        const result = await usermodel.findOne({ email:email });
        console.log(result)
        if(result){
            resp.send({message : "This email ID is already registered..!", alert : false})
         }else{
            const data = usermodel(req.body)
            const save = data.save()
            resp.send({message : "Successfully signed up..!",  alert : true})
         }
     } catch (err) {
       console.log(err)
     }    
})

// API Login

app.post("/login", async(req,res) => {
    console.log(req.body);
    const {email, password} = req.body;

    try {
        const result = await usermodel.findOne({ email:email, password : password });
        
        if(result){
            const datasend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
            };
            console.log(datasend)
            res.send({message : "Logged In Successfully", alert : true,data : datasend})
         }else{
            res.send({message : "Please Enter Valid Credentials", alert : false})
         }
     } catch (err) {
       console.log(err)
     }  
})

// Product Section

const schemaProduct = mongoose.Schema({
    name : String,
    category : String,
    image : String,
    qty : String,
    price : String,
    description : String
})

const productModel = mongoose.model("product", schemaProduct)

// Save product in database
// API
app.post("/uploadProduct", async(req, res) => {
    console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message: "Product uploaded successfully"})
})

// Fetch Product Details from DB
// API

app.get("/product", async(req, res) => {
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})

app.listen(PORT, ()=>console.log("server is running at port: " + PORT))