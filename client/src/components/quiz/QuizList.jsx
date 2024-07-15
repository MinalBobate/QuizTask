import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/quizzes');
        console.log(res.data);
        setQuizzes(res.data);
      } catch (err) {
        console.error('Error fetching quizzes:', err);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h2>All Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <Link to={`/quiz/${quiz._id}`}>View Quiz</Link>
            <Link to={`/quiz/take/${quiz._id}`}>Take Quiz</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
