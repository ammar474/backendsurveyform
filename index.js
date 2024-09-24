import mongoose from "mongoose"
import express from "express"
import cors from "cors";
import formRouter from "./routes/routes.js";
import {PORT , mongodbUrl} from "./config.js"



const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000','https://survey-form-one-kappa.vercel.app'],
    credentials: true
  }));
app.use('/', formRouter );



mongoose
.connect(mongodbUrl)
.then(()=>{
    console.log("data base connected");
    app.listen(PORT , () => {
        console.log(`server is running on port ${PORT}`);
    })
})
.catch((error)=>{
     console.log(error);
})

