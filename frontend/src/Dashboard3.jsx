// ADMIN3

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
} from "@mui/material";

const drawerWidth = 240;

const Dashboard1 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [userRole, setRole] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedRole) {
      setUser(storedUser);
      setRole(storedRole);

      if (storedRole !== "Admin3") {
        navigate("/admin4");
      }
    } else {
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
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Drawer */}
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
  onClick={() => navigate("/admin1")}
  sx={{
    pl: 3,
    "&:hover": {
      backgroundColor: "#e0f2f1", // light teal
    },
  }}
>
  <ListItemText
    primary="Dashboard"
    primaryTypographyProps={{ fontWeight: "bold" }}
  />
</ListItem>

          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <AppBar position="fixed" sx={{ zIndex: 1201, backgroundColor: "#009688" }}>
  <Toolbar sx={{ justifyContent: "space-between" }}>
    <Typography variant="h6">Admin Dashboard</Typography>
    <Button sx={{ color: "#fff" }} onClick={handleLogout}>
      Logout
    </Button>
  </Toolbar>
</AppBar>

        <Toolbar /> {/* Spacer for AppBar */}

        <Typography variant="h5" gutterBottom fontWeight="bold">
          Welcome, {userRole} {user}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">Admin Panel</Typography>
              <Typography variant="body2">Manage system controls</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">Reports</Typography>
              <Typography variant="body2">View activity logs</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">Messages</Typography>
              <Typography variant="body2">No new messages</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard1;
