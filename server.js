const express= require('express')
const cors= require('cors')
const mongoose= require('mongoose')
const path = require('path')
require('dotenv').config()
const app=express();
const port= process.env.PORT||5000;
app.use(cors());
app.use(express.json());


const uri=process.env.ATLAS_URI;
mongoose.connect(uri);

const connection =  mongoose.connection;
connection.once("open",()=>{
    console.log("mongodb connected");
})

const exercisesRouter= require ("./routes/exercise");
const usersRouter=require("./routes/users");

app.use("/exercises",exercisesRouter);
app.use("/users",usersRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    // Catch-all route to serve React's index.html for any other routes
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}


app.listen(port,()=>{
    console.log("server is running");
})