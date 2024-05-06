import { useState } from "react";
import { Box, Button, TextField, Typography, FormControl } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const LoginCheck = async () => {
    try {
      const res = await axios.get(
        `https://to-do-app-server-6sx6.onrender.com/users`
      );
      const data = res.data;

      let notFound = true;
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].email === loginEmail &&
          data[i].password === loginPassword
        ) {
          localStorage.setItem("logindata", JSON.stringify(data[i]));
          localStorage.setItem("isAuth", true);
          navigate("/");
          notFound = false;
        }
      }
      if (notFound) {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
        <Box p={{ xs: "14px", md: "20px" }}>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            style={{ marginBottom: "15px" }}
          >
            Login
          </Typography>
          <TextField
            fullWidth
            id="loginemail"
            label="Email"
            variant="outlined"
            margin="normal"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <TextField
            fullWidth
            id="loginpassword"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={LoginCheck}
            style={{ marginTop: "15px" }}
          >
            Login
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default Login;
