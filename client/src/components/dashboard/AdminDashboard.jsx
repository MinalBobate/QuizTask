import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await axios.get('http://localhost:5000/api/quizzes');
      setQuizzes(res.data);
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <a href="/quiz/create">Create New Quiz</a>
      </div>
      <div>
        <h3>All Quizzes</h3>
        {quizzes.map((quiz) => (
          <div key={quiz._id}>
            <h4>{quiz.title}</h4>
            <p>{quiz.description}</p>
            <a href={`/quiz/${quiz._id}`}>Edit</a>
            {/* <button onClick={() => deleteQuiz(quiz._id)}>Delete</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
