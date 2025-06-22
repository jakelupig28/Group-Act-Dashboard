import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Alert,
  Container,
} from "@mui/material";

const drawerWidth = 240;

export default function EmailForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const [response, setResponse] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/send-email",
        formData
      );
      setResponse(res.data.message);
    } catch (error) {
      setResponse("Error sending email");
    }
  };

  const handleLogout = () => {
    // Add logout logic if needed
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
     <Toolbar />
<Box sx={{ overflow: "auto" }}>
  <List>
    <ListItem
      button
      onClick={() => navigate("/student")}
      sx={{
        pl: 3,
        "&:hover": {
          backgroundColor: "#f0f0f0", // light gray
        },
      }}
    >
      <ListItemText
        primary="Dashboard"
        primaryTypographyProps={{ fontWeight: "bold" }}
      />
    </ListItem>

    <ListItem
      button
      onClick={() => navigate("/Emailform")}
      sx={{
        pl: 3,
        "&:hover": {
          backgroundColor: "#f0f0f0", // light gray
        },
      }}
    >
      <ListItemText
        primary="Email Us"
        primaryTypographyProps={{ fontWeight: "bold" }}
      />
    </ListItem>
  </List>
</Box>




      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="fixed" sx={{ zIndex: 1201 }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Student Dashboard</Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Toolbar /> {/* Spacer for AppBar */}

        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Send Email
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="to"
              type="email"
              label="Recipient Email"
              required
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="subject"
              label="Subject"
              required
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="message"
              label="Message"
              multiline
              rows={4}
              required
              margin="normal"
              onChange={handleChange}
            />
            <Button variant="contained" type="submit" sx={{ mt: 2 }}>
              Send
            </Button>
          </form>

          {response && (
            <Alert
              severity={response.includes("Error") ? "error" : "success"}
              sx={{ mt: 2 }}
            >
              {response}
            </Alert>
          )}
        </Container>
      </Box>
    </Box>
  );
}
