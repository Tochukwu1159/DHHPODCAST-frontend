import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useTheme } from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { generateOtp } from '../api'; // Replace this with the actual send verification email API call

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin: 16px 22px;
`;

const LoginText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0px 26px 0px 26px;
`;

const Span = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
  margin: 0px 26px 0px 26px;
`;

const OutlinedBox = styled.div`
  height: 30px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.primary};
  color: white;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  width: 150px; /* Adjust width as needed */
  margin: 12px auto; /* Center horizontally with auto margin */
`;

const Verify = ({ email, name, reason }) => {
  const theme = useTheme();
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);

  const sendVerificationEmail = async () => {
    try {
      setSending(true);
      const res = await generateOtp(email, name, reason); // Replace with actual email API
      if (res.status === 200) {
        setEmailSent(true);
      }
    } catch (err) {
      console.error('Error sending verification email:', err.message);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    sendVerificationEmail();
  }, []);

  return (
    <div>
      <Title>VERIFY ACCOUNT</Title>
      <LoginText>
        A verification <b>&nbsp;email &nbsp;</b> has been sent to:
      </LoginText>
      <Span>{email}</Span>
      
      {sending && (
        <div
          style={{
            padding: '12px 26px',
            marginBottom: '20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            justifyContent: 'center'
          }}
        >
          Sending Verification Email <CircularProgress color="inherit" size={20} />
        </div>
      )}

      {/* {emailSent && ( */}
        <OutlinedBox onClick={sendVerificationEmail}>
          Resend  Email
        </OutlinedBox>
      {/* )} */}
    </div>
  );
};

export default Verify;
