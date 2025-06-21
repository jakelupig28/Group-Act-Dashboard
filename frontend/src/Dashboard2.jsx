// JAKE G. LUPIG - ADMIN2

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Grid,
  Paper
} from "@mui/material";

const Dashboard2 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [userRole, setRole] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    console.log("Stored User:", storedUser);
    console.log("Stored Role:", storedRole);

    if (storedUser && storedRole) {
      setUser(storedUser);
      setRole(storedRole);

      if (storedRole !== "Admin2") {
        console.log("Not Admin2, redirecting to /admin3...");
        navigate("/admin3");
      }
    } else {
      console.log("No user or role found, redirecting to login...");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Admin2 Dashboard</Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Welcome, {userRole} {user}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">User Access</Typography>
              <Typography variant="body2">Manage user permissions</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">System Logs</Typography>
              <Typography variant="body2">Review system activities</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">Support Requests</Typography>
              <Typography variant="body2">Track open tickets</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard2;
