import app from "./app.js";

import dotenv from "dotenv";

import connectDB from "./database/database.js";


dotenv.config({
    path: "./database/.env"
})
app.listen(process.env.PORT, () => {
    connectDB();
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});