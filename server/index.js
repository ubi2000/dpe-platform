const express =require ("express")
const cors= require("cors")
const dotenv=require("dotenv")
const connectDB =require("./config/db")
const authRoutes=require("./routes/authRoutes")
const authMiddleware=require("./middleware/authMiddleware")
const propertyRoutes=require("./routes/propertyRoutes")

dotenv.config()
connectDB()

const app= express()

app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/properties", propertyRoutes);


app.get("/",(req,res)=>{
 res.send("App is running...")
})


app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ msg: "You accessed protected route!", userId: req.user });
});

app.listen(5000,()=>{
    console.log("Server running on port 5000")
})