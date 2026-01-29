import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/healthz", async (req, res) => {
  try {
   
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ ok: false });
    }

    await mongoose.connection.db.admin().ping();

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(503).json({ ok: false });
  }
});

export default router;
