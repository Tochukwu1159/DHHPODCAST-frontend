
import {
  CloseRounded,
  EmailRounded,
  PasswordRounded,
  Person,
  Visibility,
  VisibilityOff,
  TroubleshootRounded,
  Phone,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "styled-components";
import Google from "../Images/google.webp";
import { IconButton, Modal } from "@mui/material";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { openSnackbar } from "../redux/snackbarSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import validator from "validator";
import { googleSignIn, signUp } from "../api/index";
import { useGoogleLogin } from "@react-oauth/google";
import { closeSignin, openSignin } from "../redux/setSigninSlice";
import { useCreateUser } from "../api/user";
import Verify from "./Verify";

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
  color: ${({ theme }) => theme.text_secondary};
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin: 16px 28px;
`;

const OutlinedBox = styled.div`
  height: 44px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  color: ${({ theme }) => theme.text_secondary};
  ${({ googleButton, theme }) =>
    googleButton &&
    `
    user-select: none; 
  gap: 16px;`}
  ${({ button, theme }) =>
    button &&
    `
    user-select: none; 
  border: none;
    background: ${theme.button};
    color: '${theme.text_secondary}';`}
  ${({ activeButton, theme }) =>
    activeButton &&
    `
    user-select: none; 
  border: none;
    background: ${theme.primary};
    color: white;`}
  margin: 3px 20px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 0px 14px;
`;

const GoogleIcon = styled.img`
  width: 22px;
`;

const Divider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  font-weight: 600;
`;

const Line = styled.div`
  width: 80px;
  height: 1px;
  border-radius: 10px;
  margin: 0px 10px;
  background-color: ${({ theme }) => theme.text_secondary};
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text_secondary};
`;

const LoginText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin: 20px 20px 38px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Span = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const Error = styled.div`
  color: red;
  font-size: 10px;
  margin: 2px 26px 8px 26px;
  display: block;
  ${({ error, theme }) =>
    error === "" &&
    `display: none;`}
`;

const SignUp = ({ setSignUpOpen, setSignInOpen }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [credentialError, setCredentialError] = useState("");
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [nameCorrect, setNameCorrect] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const dispatch = useDispatch();
  const { mutate: createUser, isPending: createUserPending } = useCreateUser();



  const handleSignUp = async (e) => {
      e.preventDefault();
      createUser({ firstName, lastName,email ,phoneNumber, password, confirmPassword });
      if (!disabled) {
          setOtpSent(true);
      }

      if (firstName === "" || lastName === "" || email === "" || password === "") {
          dispatch(
              openSnackbar({
                  message: "Please fill all the fields",
                  severity: "error",
              })
          );
      }
  };

  useEffect(() => {
      if (email !== "") validateEmail();
      if (password !== "") validatePassword();
      if (firstName !== "" && lastName !== "") validateName();
      if (
          firstName !== "" &&
          lastName !== "" &&
          validator.isEmail(email) &&
          passwordCorrect &&
          nameCorrect
      ) {
          setDisabled(false);
      } else {
          setDisabled(true);
      }
  }, [firstName, lastName, email, passwordCorrect, password, nameCorrect]);

  // useEffect(() => {
  //     createAccount();
  // }, [otpVerified]);

  const validateEmail = () => {
      if (validator.isEmail(email)) {
          setEmailError("");
      } else {
          setEmailError("Enter a valid Email Id!");
      }
  };

  const validatePassword = () => {
      if (password.length < 8) {
          setCredentialError("Password must be at least 8 characters long!");
          setPasswordCorrect(false);
      } else if (password.length > 16) {
          setCredentialError("Password must be less than 16 characters long!");
          setPasswordCorrect(false);
      } else if (
          !password.match(/[a-z]/g) ||
          !password.match(/[A-Z]/g) ||
          !password.match(/[0-9]/g) ||
          !password.match(/[^a-zA-Z\d]/g)
      ) {
          setPasswordCorrect(false);
          setCredentialError(
              "Password must contain at least one lowercase, uppercase, number, and special character!"
          );
      } else {
          setCredentialError("");
          setPasswordCorrect(true);
      }
  };

  const validateName = () => {
      if (firstName.length < 4 || lastName.length < 4) {
          setNameCorrect(false);
          setNameError("First name and last name must be at least 4 characters long!");
      } else {
          setNameCorrect(true);
          if (!nameCorrect) {
              setNameError("");
              setNameCorrect(true);
          }
      }
  };

  const googleLogin = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
          setLoading(true);
          const user = await axios.get(
              'https://www.googleapis.com/oauth2/v3/userinfo',
              { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
          ).catch((err) => {
              dispatch(loginFailure());
              dispatch(
                  openSnackbar({
                      message: err.message,
                      severity: "error",
                  })
              );
          });

          googleSignIn({
              name: user.data.name,
              email: user.data.email,
              img: user.data.picture,
          }).then((res) => {
              if (res.status === 200) {
                  dispatch(loginSuccess(res.data));
                  dispatch(closeSignin());
                  setSignUpOpen(false);
                  dispatch(
                      openSnackbar({
                          message: "Logged In Successfully",
                          severity: "success",
                      })
                  );
                  setLoading(false);
              } else {
                  dispatch(loginFailure(res.data));
                  dispatch(
                      openSnackbar({
                          message: res.data.message,
                          severity: "error",
                      })
                  );
                  setLoading(false);
              }
          });
      },
  });

  const handleGoogleSignIn = () => {
      googleLogin();
  };

  return (
      <Container>
          <Wrapper>
              <Title>Sign Up</Title>
              <form>
                  <OutlinedBox>
                      <Person style={{ color: "#8D8D8D" }} />
                      <TextInput
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                      />
                  </OutlinedBox>
                  <Error error={nameError}>{nameError}</Error>
                  <OutlinedBox>
                      <Person style={{ color: "#8D8D8D" }} />
                      <TextInput
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                      />
                  </OutlinedBox>
                  <Error error={nameError}>{nameError}</Error>
                  <OutlinedBox>
                      <EmailRounded style={{ color: "#8D8D8D" }} />
                      <TextInput
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                  </OutlinedBox>
                  <Error error={emailError}>{emailError}</Error>
                  <OutlinedBox>
                      <Phone style={{ color: "#8D8D8D" }} />
                      <TextInput
                          placeholder="Phone Number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                  </OutlinedBox>
                  <OutlinedBox>
                      <PasswordRounded style={{ color: "#8D8D8D" }} />
                      <TextInput
                          placeholder="Password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                  </OutlinedBox>
                  <OutlinedBox>
                      <PasswordRounded style={{ color: "#8D8D8D" }} />
                      <TextInput
                          placeholder="Confirm Password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                  </OutlinedBox>
                  <Error error={credentialError}>{credentialError}</Error>
                  <OutlinedBox
                      activeButton={!disabled}
                      onClick={handleSignUp}
                  >
                      {loading ? (
                          <CircularProgress color="secondary" size={24} />
                      ) : (
                          "Sign Up"
                      )}
                  </OutlinedBox>
              {/* :
              <Verify email={email} name={name} otpVerified={otpVerified} setOtpVerified={setOtpVerified} />
            } */}


              </form>
              <Divider>
                  <Line />
                  <span>Or</span>
                  <Line />
              </Divider>
              <OutlinedBox googleButton onClick={handleGoogleSignIn}>
                  <GoogleIcon src={Google} />
                  <span>Sign Up with Google</span>
              </OutlinedBox>
              <LoginText>
                  Already have an account?{" "}
                  <Span onClick={() => {
                      setSignUpOpen(false);
                      setSignInOpen(true);
                  }}>
                      Sign In
                  </Span>
              </LoginText>
          </Wrapper>
      </Container>
  );
};

export default SignUp;
