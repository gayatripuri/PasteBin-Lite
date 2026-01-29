
import mongoose from "mongoose"

const connectDB = async ()=>{
    try{
 const db= await mongoose.connect(process.env.MONGODB_URL)
    console.log(`Database is connected with ${db.connection.host}`)
    }catch(err){
        console.log("database is not connected")
    }
   
}

export default connectDB;
