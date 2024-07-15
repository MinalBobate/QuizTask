import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Box, Typography, Divider, FormControl, FormControlLabel, Radio, styled } from '@mui/material';

const FormContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  maxWidth: '800px',
  marginTop: theme.spacing(5),
}));

const QuestionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: '4px',
  width:"100%",
  border: '1px solid #e0e0e0',
  backgroundColor: '#fafafa',
}));

const AddButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: '#00796b',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#004d40',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: '#00796b',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#004d40',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: '#004d40',
  fontWeight: 700,
}));

const QuizForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctOption: null }
  ]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctOption: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedQuestions = questions.map(question => ({
      questionText: question.questionText,
      options: question.options.map((option, index) => ({
        optionText: option,
        isCorrect: index === question.correctOption
      }))
    }));

    const newQuiz = {
      title,
      description,
      timer,
      questions: formattedQuestions
    };

    try {
      await axios.post('http://localhost:5000/api/quizzes/create', newQuiz, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      alert('Quiz created successfully');
    } catch (err) {
      console.error('Error creating quiz:', err);
      alert('Error creating quiz');
    }
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      <Title variant="h4">Create a New Quiz</Title>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Description (Optional)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Timer (in minutes)"
        variant="outlined"
        fullWidth
        margin="normal"
        type="number"
        value={timer}
        onChange={(e) => setTimer(e.target.value)}
        required
      />
      <Divider sx={{ width: '100%', my: 3 }} />
      {questions.map((question, qIndex) => (
        <QuestionContainer key={qIndex}>
          <Typography variant="h6" gutterBottom>
            Question {qIndex + 1}
          </Typography>
          <TextField
            label="Question Text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={question.questionText}
            onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
            required
          />
          {question.options.map((option, oIndex) => (
            <Box key={oIndex} mb={2}>
              <TextField
                label={`Option ${oIndex + 1}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={option}
                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                required
              />
              <FormControl component="fieldset" margin="normal">
                <FormControlLabel
                  control={
                    <Radio
                      checked={question.correctOption === oIndex}
                      onChange={() => handleQuestionChange(qIndex, 'correctOption', oIndex)}
                    />
                  }
                  label="Correct"
                />
              </FormControl>
            </Box>
          ))}
        </QuestionContainer>
      ))}
      <AddButton variant="contained" onClick={addQuestion}>
        Add Question
      </AddButton>
      <SubmitButton type="submit" variant="contained">
        Create Quiz
      </SubmitButton>
    </FormContainer>
  );
};

export default QuizForm;
