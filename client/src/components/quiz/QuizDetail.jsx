import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizDetail = ({ match }) => {
  const [quiz, setQuiz] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        setQuiz(res.data);
      } catch (err) {
        console.error('Error fetching quiz:', err);
      }
    };
    fetchQuiz();
  }, [id]);

  const deleteQuestion = async (questionId) => {
    try {
      
      await axios.delete(`http://localhost:5000/api/questions/${questionId}`);
      setQuiz({
        ...quiz,
        questions: quiz.questions.filter((question) => question._id !== questionId),
      });
    } catch (err) {
      console.error('Error deleting question:', err);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <ul>
        {quiz.questions.map((question) => (
          <li key={question._id}>
            <p>{question.questionText}</p>
            <ul>
              {question.options.map((option, index) => (
                <li key={index}>{option.optionText}</li>
              ))}
            </ul>
            <button onClick={() => deleteQuestion(question._id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizDetail;
