import Quiz from '../models/quizModel.js'

import User from '../models/userModel.js'

import { validationResult } from 'express-validator'

export const createQuiz = async (req, res) => {
  const { title, description, timer, questions } = req.body;
  
  try {
    const quiz = new Quiz({
      title,
      description,
      timer,
      questions
      
    });
    
    const savedQuiz = await quiz.save();
   
   
    res.json(savedQuiz);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Edit a quiz
export const editQuiz = async (req, res) => {
  const { title, description, timer, questions } = req.body;

  try {
    let quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ msg: 'Quiz not found' });
    }

    quiz.title = title || quiz.title;
    quiz.description = description || quiz.description;
    quiz.timer = timer || quiz.timer;
    quiz.questions = questions || quiz.questions;

    await quiz.save();
    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a quiz
export const deleteQuiz = async (req, res) => {
  try {
    let quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ msg: 'Quiz not found' });
    }
console.log("11111");
    await Quiz.findByIdAndRemove(req.params.id);
    console.log("222");
    res.json({ msg: 'Quiz removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// View all quizzes
export const viewQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// View a single quiz
export const viewQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ msg: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Submit quiz answers and calculate score
export const submitQuiz = async (req, res) => {
  const { answers } = req.body;
  
  console.log(answers);
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ msg: 'Quiz not found' });
    }
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.options[answers[question._id]]?.isCorrect) {

        //object[key] gives value anser is object question._id is key and it will give selected option ie. 0,1,2,3
        score += 1;
      }
    });
    // const user = await User.findById(req.user.id);
    // console.log("server 6");
    // user.attemptedQuizzes.push({ quizId: quiz._id, score });
    // console.log("server 7");
    // await user.save();

    res.json({ score });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

