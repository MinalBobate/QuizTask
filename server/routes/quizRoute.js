import express from "express"
// import { createQuiz } from '../controllers/quizController.js'
import {createQuiz,editQuiz,deleteQuiz,submitQuiz,viewQuiz,viewQuizzes} from "../controllers/quizController.js"
import { auth } from '../middleware/authMiddleware.js'
const router = express.Router();
import { check } from 'express-validator'

router.post('/create',  
//      [
//     auth,
//     [
//       check('title', 'Title is required').not().isEmpty(),
//       check('questions', 'Questions are required').isArray({ min: 1 }),
//     ],
//   ], 
  createQuiz);




  router.put('/:id',editQuiz);

  // @route   DELETE api/quizzes/:id
  // @desc    Delete a quiz
  // @access  Admin
  router.delete('/:id', deleteQuiz);
  
  // @route   GET api/quizzes
  // @desc    View all quizzes
  // @access  Public
  router.get('/', viewQuizzes);
  
  // @route   GET api/quizzes/:id
  // @desc    View a single quiz
  // @access  Public
  router.get('/:id', viewQuiz);
  
  // @route   POST api/quizzes/:id/submit
  // @desc    Submit quiz answers
  // @access  User
  
  router.post('/:id/submit', submitQuiz);

export default router;