import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await axios.get('http://localhost:5000/api/quizzes');
      setQuizzes(res.data);
    };
    const fetchAttemptedQuizzes = async () => {
      const res = await axios.get('http://localhost:5000/api/users/attempted-quizzes');
      setAttemptedQuizzes(res.data);
    };
    fetchQuizzes();
    fetchAttemptedQuizzes();
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      <div>
        <h3>Available Quizzes</h3>
        {quizzes.map((quiz) => (
          <div key={quiz._id}>
            <h4>{quiz.title}</h4>
            <p>{quiz.description}</p>
            <a href={`/quiz/take/${quiz._id}`}>Take Quiz</a>
          </div>
        ))}
      </div>
      <div>
        <h3>Attempted Quizzes</h3>
        {attemptedQuizzes.map((quiz) => (
          <div key={quiz.quizId}>
            <h4>{quiz.title}</h4>
            <p>Score: {quiz.score}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default UserDashboard;

