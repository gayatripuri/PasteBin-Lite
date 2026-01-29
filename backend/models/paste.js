import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    content: {
      type: String,
      required: true
    },

    expiresAt: {
      type: Date,
      default: null
    },

    maxViews: {
      type: Number,
      default: null
    },

    viewCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// generate shortId
pasteSchema.pre("validate", function () {
  if (!this.shortId) {
    this.shortId = Math.random().toString(36).substring(2, 10);
  }
});

export default mongoose.model("Paste", pasteSchema);
