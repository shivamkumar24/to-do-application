import { useState } from "react";
import { Box, Button, TextField, Typography, FormControl } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");

  const SignUpCheck = () => {
    let signupobj = {
      userID: Date.now(),
      name: signupName,
      email: signupEmail,
      password: signupPassword,
      phone: signupPhone,
    };

    axios
      .post(`https://notebook-server-8hzk.onrender.com/users`, signupobj)
      .then((res) => {
        localStorage.setItem("signupdata", JSON.stringify(res.data));
        localStorage.setItem("isAuth", true);
        navigate("/login");
        console.log(res.data);
      })
      .catch((e) => {
        console.error("Error:", e);
      });
  };

  return (
    <Box
      width={{ xs: "90%", md: "40%" }}
      height={"auto"}
      margin="auto"
      marginTop={{ xs: "40px", md: "100px" }}
      alignContent="center"
      borderRadius="18px"
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
    >
      <FormControl>
        <Box p={{ xs: "20px", md: "20px" }}>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            style={{ marginBottom: "15px" }}
          >
            SignUp
          </Typography>
          <TextField
            fullWidth
            id="signupname"
            label="Name"
            variant="outlined"
            margin="normal"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
          />
          <TextField
            fullWidth
            id="signupemail"
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
          <TextField
            fullWidth
            id="signuppassword"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
          <TextField
            fullWidth
            id="signupphone"
            label="Phone"
            type="number"
            variant="outlined"
            margin="normal"
            value={signupPhone}
            onChange={(e) => setSignupPhone(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={SignUpCheck}
            style={{ marginTop: "15px" }}
          >
            SignUp
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default Signup;
