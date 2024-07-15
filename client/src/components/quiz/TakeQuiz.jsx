import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, FormControl, FormControlLabel, Radio, Button, Box, CircularProgress, Divider, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Sidebar = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #e0e0e0',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
}));

const QuestionButton = styled(Button)(({ theme, status }) => ({
  margin: theme.spacing(1),
  borderRadius: '50%',
  minWidth: '40px',
  height: '40px',
  backgroundColor: status === 'answered' ? '#4caf50' : 
                   status === 'visitedButUnanswered' ? '#f44336' : 
                   status === 'visited' ? '#f0f0f0' : '#ffffff',
  color: status === 'answered' ? '#ffffff' : '#000000',
  '&:hover': {
    backgroundColor: status === 'answered' ? '#388e3c' : 
                      status === 'visitedButUnanswered' ? '#c62828' : 
                      '#f5f5f5',
  },
}));

const QuestionContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: '4px',
  border: '1px solid #e0e0e0',
  backgroundColor: '#fafafa',
}));

const TakeQuiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [visitedQuestions, setVisitedQuestions] = useState(new Set());
  const navigate = useNavigate();
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

  useEffect(() => {
    if (quiz) {
      setVisitedQuestions(new Set()); // Reset visited questions on new quiz load
    }
  }, [quiz]);

  const handleChange = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/quizzes/${id}/submit`, { answers });
      setScore(res.data.score);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting quiz:', err);
    }
  };

  const handleQuestionClick = (index) => {
    setVisitedQuestions(prev => new Set(prev).add(index)); // Mark question as visited
    setCurrentQuestion(index);
  };

  const getQuestionStatus = (index) => {
    if (answers.hasOwnProperty(quiz.questions[index]._id)) {
      return 'answered';
    } else if (visitedQuestions.has(index)) {
      return 'visitedButUnanswered';
    } else {
      return 'notVisited';
    }
  };

  if (!quiz) return <CircularProgress />;

  if (submitted)
    return (
      <Container>
        <Typography variant="h4" gutterBottom>Your Score: {score}</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/user/dashboard')}>
          Go to Dashboard
        </Button>
      </Container>
    );

  return (
    <Container>
      <Sidebar>
        {quiz.questions.map((_, index) => (
          <QuestionButton
            key={index}
            status={getQuestionStatus(index)}
            onClick={() => handleQuestionClick(index)}
          >
            {index + 1}
          </QuestionButton>
        ))}
      </Sidebar>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>{quiz.title}</Typography>
        <form onSubmit={handleSubmit}>
          <QuestionContainer>
            {quiz.questions.map((question, index) => (
              <div key={question._id} style={{ display: currentQuestion === index ? 'block' : 'none' }}>
                <Typography variant="h6" gutterBottom>{question.questionText}</Typography>
                {question.options.map((option, oIndex) => (
                  <FormControl key={oIndex} component="fieldset" margin="normal">
                    <FormControlLabel
                      control={
                        <Radio
                          checked={answers[question._id] === oIndex}
                          onChange={() => handleChange(question._id, oIndex)}
                        />
                      }
                      label={option.optionText}
                    />
                  </FormControl>
                ))}
                <Divider sx={{ my: 2 }} />
              </div>
            ))}
          </QuestionContainer>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <IconButton
              onClick={() => setCurrentQuestion(prev => Math.max(prev - 1, 0))}
              disabled={currentQuestion === 0}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton
              onClick={() => setCurrentQuestion(prev => Math.min(prev + 1, quiz.questions.length - 1))}
              disabled={currentQuestion === quiz.questions.length - 1}
            >
              <NavigateNextIcon />
            </IconButton>
          </Box>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Submit Quiz</Button>
        </form>
      </Box>
    </Container>
  );
};

export default TakeQuiz;
