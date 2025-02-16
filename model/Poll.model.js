import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema({
  option: String,
  votes: { type: Number, default: 0 },
});

const PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [OptionSchema],
});

const Poll = mongoose.model('Poll', PollSchema);

export default Poll;
