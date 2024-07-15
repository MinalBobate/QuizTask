import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './components/dashboard/AdminDashboard';
import UserDashboard from './components/dashboard/UserDashboard';
import QuizForm from './components/quiz/QuizForm';
import QuizList from './components/quiz/QuizList';
import QuizDetail from './components/quiz/QuizDetail';
import TakeQuiz from './components/quiz/TakeQuiz';


function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      
      <Routes>
        <Route exact path="/" element={<QuizList />} />
        <Route  path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route exact path="/user/dashboard" element={<UserDashboard />} />
        <Route exact path="/quiz/create" element={<QuizForm />} />
        <Route exact path="/quiz/:id" element={<QuizDetail />} />
        <Route exact path="/quiz/take/:id" element={<TakeQuiz />} />
      </Routes>
    </Router>
  );
  
}

export default App;
