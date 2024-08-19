import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useForgotPassword } from '../api/user'; // Adjust import paths as needed

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 380px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled(Typography)`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin: 16px 28px;
`;

const Error = styled.div`
  color: red;
  font-size: 10px;
  margin: 2px 26px 8px 26px;
  display: ${({ error }) => (error ? 'block' : 'none')};
`;

const Success = styled.div`
  color: green;
  font-size: 10px;
  margin: 2px 26px 8px 26px;
  display: ${({ success }) => (success ? 'block' : 'none')};
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { mutate: forgotPassword, isLoading } = useForgotPassword({
    onSuccess: () => {
      setSuccess(true);
    },
    onError: (error) => {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    },
  });

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setError('');
    forgotPassword({ email });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Forgot Password</Title>
        <form onSubmit={handleForgotPassword}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Error error={error}>{error}</Error>
          <Success success={success}>
            An email has been sent with instructions to reset your password.
          </Success>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Send Reset Link'}
          </Button>
        </form>
      </Wrapper>
    </Container>
  );
};

export default ForgotPassword;
