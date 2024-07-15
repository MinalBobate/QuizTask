import mongoose from "mongoose"

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  timer: { type: Number, required: true },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      options: [
        {
          optionText: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
  ],  
});

const Quiz = mongoose.model('Quiz', QuizSchema);
export default Quiz


