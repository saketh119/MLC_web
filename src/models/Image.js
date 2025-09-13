import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema(
  {
    title: { type: String },
    // When using external storage
    imageUrl: { type: String },
    // When storing file in Mongo GridFS
    fileId: { type: mongoose.Schema.Types.ObjectId },
    filename: { type: String },
    contentType: { type: String },
    length: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
