import { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../../../utils/firebase";
import styled from "@mui/material/styles/styled";
import { Button, TextField, Box, Typography } from "@mui/material";
import logo from "../../../assets/images/mlf1.png";
import { useDispatch } from "react-redux";

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
  // Removed borderRadius to match the original request
}));

const Logo = styled("img")(({ theme }) => ({
  width: "150px",
  marginTop: "0", // Adjusted marginTop to move the logo up
  height: "auto",
}));

const StaticText = styled(Typography)(({ theme }) => ({
  fontSize: "2.4rem",
  fontWeight: "bold",
  color: "#000000",
  marginTop: "0", // Adjusted marginTop to move the text up
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

const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState(""); // State for user type
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const userSnapshot = await firebase
        .firestore()
        .collection("users")
        .where("username", "==", username)
        .get();
      if (!userSnapshot.empty) {
        throw new Error("Username already exists");
      }
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await user.updateProfile({
        displayName: username,
      });

      // Data to be stored in Firestore
      const userData = {
        email,
        username,
        userType,
      };

      // If the user is a psychiatrist, initialize their rating to 0
      if (userType === "Psychiatrist") {
        userData.rating = 0;
      }

      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set(userData);

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <LeftSide>
        <Logo src={logo} alt="logo" />
        <StaticText>Your Journey to</StaticText>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#000000"
          textAlign="center"
        >
          Mental Well-being Starts Here!
        </Typography>
      </LeftSide>
      <RightSide>
        <Form component="form" onSubmit={handleJoin}>
          <Typography variant="h5" gutterBottom textAlign="center">
            Join
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
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <StyledTextField
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <StyledButton variant="contained" type="submit">
            Join
          </StyledButton>
        </Form>
      </RightSide>
    </Container>
  );
};

export default Join;
