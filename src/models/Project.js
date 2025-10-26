import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    githubUrl: { type: String }
  },
  { timestamps: true, collection: 'Projects' }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
