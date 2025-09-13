import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,
  linkedin: String,
  category: { type: String, default: 'Others' },
});

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
