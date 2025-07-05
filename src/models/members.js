import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,
  linkedin: String,
});

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
