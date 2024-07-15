import React, { createContext, useState } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);

  return (
    <QuizContext.Provider value={{ quizzes, setQuizzes }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
