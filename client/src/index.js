import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/quizContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <AuthProvider >
  <QuizProvider>
    <App />
  </QuizProvider>
 </AuthProvider>
  
);


