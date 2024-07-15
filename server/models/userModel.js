import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  attemptedQuizzes: [
    {
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
      },
      score: {
        type: Number,
      },
    },
  ]});

const User = mongoose.model('User', UserSchema);
export default User


