import { useState } from "react";
import axios from "axios";
import {TextField, Button, Typography, Box, Container} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        { username, password, role },
        { headers: { "Content-Type": "application/json" } }
      );
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "#fff" }}>
      <Typography align="center" variant="h3" gutterBottom>
        <b>Register</b>
      </Typography>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Role"
        fullWidth
        margin="normal"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
        >
          Register
        </Button>
      </Box>
      <Box mt={1}>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
