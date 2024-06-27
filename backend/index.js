const express = require("express")
const mongoose  = require("mongoose")
const cors = require("cors")
const app = express()
require('dotenv').config()
const multer = require('multer')
const path = require("path");
const cookieParser = require('cookie-parser')
const authRoute = require("./routes/auth.js")
const userRoute = require("./routes/users.js")
const postRoute = require("./routes/posts.js")
const commentRoute = require("./routes/comments.js")






const ConnectDB = async()=>{
    try{
        await mongoose.connect(process.env.DB_URL,
        {useNewUrlParser: true, useUnifiedTopology : true})
        console.log("DataBase is Connected Successfully")

    }
    catch(err){

    }
}

app.use(cookieParser())
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)


// image upload
const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"images1.jpg")
    }
})

const upload = multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image has been uploaded successfully!")
})



app.listen(5000,()=>{
    ConnectDB()
    console.log("App is running on 5000")
})

// blogApp
// 2S4TlDsEAUKSfoUW