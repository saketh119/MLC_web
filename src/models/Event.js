import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    imageUrls: [{ type: String }]  // array of S3 links
  },
  { timestamps: true,
    collection: 'Events'
  }
  
);

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
