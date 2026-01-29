import express from "express";
// const mongoose= require("mongoose")
import cors from "cors";
import healthRoutes from "./routes/healthRoute.js";
import pasteRoutes from "./routes/pasteRoute.js";
const app=express();

app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(express.json())
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: console.log("server is working fine"),
  });
});

app.use("/api", healthRoutes);
app.use("/api", pasteRoutes);
app.use("/", pasteRoutes);
// app.use(pasteRoutes);
export default app;


