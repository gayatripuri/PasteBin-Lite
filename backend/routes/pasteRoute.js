import express from "express";
import Paste from "../models/paste.js";
import { now } from "../utils/time.js";

const router = express.Router();

/* ---------------- CREATE PASTE ---------------- */
router.post("/pastes", async (req, res) => {
  const { content, ttl_seconds, max_views } = req.body;

  // Validation
  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Invalid content" });
  }

  if (
    ttl_seconds !== undefined &&
    (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)
  ) {
    return res.status(400).json({ error: "Invalid ttl_seconds" });
  }

  if (
    max_views !== undefined &&
    (!Number.isInteger(max_views) || max_views < 1)
  ) {
    return res.status(400).json({ error: "Invalid max_views" });
  }

  const expiresAt = ttl_seconds
    ? new Date(Date.now() + ttl_seconds * 1000)
    : null;

  const paste = await Paste.create({
    content,
    expiresAt,
    maxViews: max_views ?? null
  });

  res.status(201).json({
    id: paste._id.toString(),
    url: `/${paste._id}`
  });
});

/* ---------------- FETCH JSON ---------------- */
router.get("/pastes/:id", async (req, res) => {
  const currentTime = now(req);

  const paste = await Paste.findOneAndUpdate(
    {
      _id: req.params.id,
      $and: [
        {
          $or: [
            { expiresAt: null },
            { expiresAt: { $gt: currentTime } }
          ]
        },
        {
          $or: [
            { maxViews: null },
            { $expr: { $lt: ["$viewCount", "$maxViews"] } }
          ]
        }
      ]
    },
    { $inc: { viewCount: 1 } },
    { new: true }
  );

  if (!paste) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json({
    content: paste.content,
    remaining_views:
      paste.maxViews !== null
        ? Math.max(paste.maxViews - paste.viewCount, 0)
        : null,
    expires_at: paste.expiresAt
  });
});

/* ---------------- HTML VIEW ---------------- */
router.get("/p/:id", async (req, res) => {
  const currentTime = now(req);

  const paste = await Paste.findOneAndUpdate(
    {
      _id: req.params.id,
      $and: [
        {
          $or: [
            { expiresAt: null },
            { expiresAt: { $gt: currentTime } }
          ]
        },
        {
          $or: [
            { maxViews: null },
            { $expr: { $lt: ["$viewCount", "$maxViews"] } }
          ]
        }
      ]
    },
    { $inc: { viewCount: 1 } },
    { new: true }
  );

  if (!paste) {
    return res.status(404).send("Not found");
  }

  const safeContent = paste.content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Paste</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      background: #f6f8fa;
      padding: 20px;
    }
    pre {
      background: white;
      padding: 16px;
      border-radius: 8px;
      white-space: pre-wrap;      
      word-break: break-word;
      overflow-wrap: anywhere;
    }
  </style>
</head>
<body>
  <pre>${safeContent}</pre>
</body>
</html>
  `);
});


export default router;


// (backup of previous code) 

// import express from "express";
// import { v4 as uuid } from "uuid";
// import Paste from "../models/Paste.js";
// import { now } from "../utils/time.js";

// const router = express.Router();

// /* CREATE */
// router.post("/api/pastes", async (req, res) => {
//   const { content, ttl_seconds, max_views } = req.body;

//   if (!content || typeof content !== "string") {
//     return res.status(400).json({ error: "Invalid content" });
//   }

//   const expiresAt = ttl_seconds
//     ? new Date(Date.now() + ttl_seconds * 1000)
//     : null;

//   const paste = await Paste.create({
//     slug: uuid(),          //  UUID stored safely
//     content,
//     expiresAt,
//     maxViews: max_views ?? null
//   });

//   res.json({
//     id: paste.slug,
//     url: `${req.protocol}://${req.get("host")}/p/${paste.slug}`
//   });
// });

// /* FETCH JSON */
// router.get("/api/pastes/:id", async (req, res) => {
//   const paste = await Paste.findOne({ slug: req.params.id });
//   if (!paste) return res.status(404).json({ error: "Not found" });

//   const currentTime = now(req);

//   if (paste.expiresAt && currentTime > paste.expiresAt) {
//     return res.status(404).json({ error: "Expired" });
//   }

//   if (paste.maxViews && paste.viewCount >= paste.maxViews) {
//     return res.status(404).json({ error: "View limit reached" });
//   }

//   paste.viewCount++;
//   await paste.save();

//   res.json({
//     content: paste.content,
//     remaining_views: paste.maxViews
//       ? paste.maxViews - paste.viewCount
//       : null,
//     expires_at: paste.expiresAt
//   });
// });

// /* HTML VIEW */
// router.get("/p/:id", async (req, res) => {
//   const paste = await Paste.findOne({ slug: req.params.id });
//   if (!paste) return res.status(404).send("Not found");

//   const currentTime = now(req);

//   if (
//     (paste.expiresAt && currentTime > paste.expiresAt) ||
//     (paste.maxViews && paste.viewCount >= paste.maxViews)
//   ) {
//     return res.status(404).send("Unavailable");
//   }

//   paste.viewCount++;
//   await paste.save();

//   res.send(`
//     <html>
//       <body>
//         <pre>${paste.content.replace(/</g, "&lt;")}</pre>
//       </body>
//     </html>
//   `);
// });

// export default router;
