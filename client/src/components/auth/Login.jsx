// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import {  useNavigate } from 'react-router-dom';
// import AuthContext from '../../context/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { setAuthData } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
//       setAuthData(res.data);
//       console.log(res.data);
//       navigate(res.data.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
//     } catch (err) {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div>
//           <label>Password</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         </div>
//         {error && <p>{error}</p>}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#FF445D',
});

const Form = styled('form')({
  width: '100%',
  maxWidth: '400px',
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const Input = styled(TextField)({
  marginBottom: '15px',
  '& .MuiInputBase-input': {
    color: '#4C141B',
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#B22F41',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#4C141B',
  },
});

const Title = styled(Typography)({
  color: '#4C141B',
  marginBottom: '20px',
});

const Error = styled(Typography)({
  color: '#ff0000',
  marginBottom: '15px',
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setAuthData(res.data);
      console.log(res.data);
      navigate(res.data.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Root>
      <Container component="main" maxWidth="xs">
        <Form onSubmit={handleLogin}>
          <Title component="h1" variant="h5">
            Login
          </Title>
          <Input
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Error>{error}</Error>}
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
          >
            Login
          </StyledButton>
        </Form>
      </Container>
    </Root>
  );
};

export default Login;
