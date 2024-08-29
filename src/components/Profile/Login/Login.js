import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "@mui/material/styles/styled";
import { Button, TextField, Box, Typography } from "@mui/material";
import firebase from "../../../utils/firebase";
import { login } from "../../../store/features/auth/authSlice.js";
import logo from "../../../assets/images/mlf1.png";

// Styled components
const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  backgroundColor: "#F0F0F0",
}));

const LeftSide = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "40px",
  backgroundColor: "#FFFFFF",
}));

const Logo = styled("img")(({ theme }) => ({
  width: "150px",
  marginTop: "0px", // Reduce the margin-top to decrease space
  height: "auto",
}));

const StaticText = styled(Typography)(({ theme }) => ({
  fontSize: "2.4rem",
  fontWeight: "bold",
  color: "#000000",
  marginTop: "10px", // Reduce the margin-top to decrease space
}));

const RightSide = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px",
  backgroundColor: "#FFFFFF",
  borderRadius: "0 16px 16px 0",
}));

const Form = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "400px",
  padding: "32px",
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  boxShadow: theme.shadows[2],
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "16px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  marginTop: "24px",
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginBottom: "16px",
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(
        login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
      navigate(from);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigate(from);
      }
    });

    return () => unsubscribe();
  }, [navigate, from]);

  return (
    <Container>
      <LeftSide>
        <Logo src={logo} alt="logo" />
        <StaticText marginTop={"0px"}>Welcome Back!</StaticText>
        <Typography variant="h4" fontWeight="bold" color="#000000" textAlign="center" marginTop={"0px"}>
          Mental Well-being Starts Here!
        </Typography>
      </LeftSide>
      <RightSide>
        <Form component="form" onSubmit={handleLogin}>
          <Typography variant="h5" gutterBottom textAlign="center">
            Login
          </Typography>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <StyledTextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledTextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton variant="contained" type="submit">
            Login
          </StyledButton>
        </Form>
      </RightSide>
    </Container>
  );
};

export default Login;
