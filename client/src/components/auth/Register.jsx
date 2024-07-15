// import React, { useState } from 'react';
// import axios from 'axios';
// import {  useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [firstname, setFirstname] = useState('');
//   const [lastname, setLastname] = useState(''); 
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     console.log(firstname,lastname,role,email,password);
//     try {
//       await axios.post('http://localhost:5000/api/auth/register', { firstname,lastname, email,role, password });
//       navigate('/login');
//     } catch (err) {
//       setError('User already exists or other error');
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <div>
//           <label>Firstname</label>
//           <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
//         </div>
//         <div>
//           <label>Lastname</label>
//           <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
//         </div>
//         <div>
//           <label>Email</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div>
//           <label>role</label>
//           <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
//         </div>
//         <div>
//           <label>Password</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         </div>
//         {error && <p>{error}</p>}
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#4CAF50', // Different background color
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
  backgroundColor: '#388E3C',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#2E7D32',
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

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState(''); 
  const [email, setEmail] = useState('');
 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    
    try {
      await axios.post('http://localhost:5000/api/auth/register', { firstname,lastname, email, password });
      navigate('/login');
    } catch (err) {
      setError('User already exists or other error');
    }
  };

  return (
    <Root>
      <Container component="main" maxWidth="xs">
        <Form onSubmit={handleRegister}>
          <Title component="h1" variant="h5">
            Register
          </Title>
          <Input
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            autoComplete="firstname"
            autoFocus
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <Input
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            autoComplete="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <Input
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            Register
          </StyledButton>
        </Form>
      </Container>
    </Root>
  );
};

export default Register;
