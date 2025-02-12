import mongoose, { Schema, Document } from "mongoose";

// Define an interface for strong TypeScript support
interface ITopic extends Document {
  title: string;
  description: string;
  date: string; // Keeping as string but ensuring validation before storage
}

const topicSchema = new Schema<ITopic>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true }, // Keeping as string, assuming formatted dates are stored
  },
  { timestamps: true }
);

const Topic =
  mongoose.models.Topic || mongoose.model<ITopic>("Topic", topicSchema);
export default Topic;
