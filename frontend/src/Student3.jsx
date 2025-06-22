import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
  Paper
} from "@mui/material";

const drawerWidth = 240;

const Student = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [userRole, setRole] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedRole) {
      setUser(storedUser);
      setRole(storedRole);

      if (storedRole !== "Student3") {
        navigate("/student4");
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
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
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

        <Typography variant="h5" gutterBottom>
          <b>Welcome, {userRole} {user}</b>
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">My Courses</Typography>
              <Typography variant="body2">View and manage enrolled classes</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">Notifications</Typography>
              <Typography variant="body2">Check for new announcements</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6">Profile</Typography>
              <Typography variant="body2">Update your student information</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Student;
