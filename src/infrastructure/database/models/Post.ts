import mongoose, { Schema, Document } from "mongoose";

export interface PostDocument extends Document {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  author: mongoose.Types.ObjectId;
  featuredImage?: string;
  tags: string[];
  categories: string[];
  status: "draft" | "published";
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    featuredImage: {
      type: String,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    categories: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    publishedAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for better query performance
PostSchema.index({ author: 1, status: 1 });
PostSchema.index({ slug: 1 });
PostSchema.index({ status: 1, publishedAt: -1 });

const Post = mongoose.models.Post || mongoose.model<PostDocument>("Post", PostSchema);

export default Post;
