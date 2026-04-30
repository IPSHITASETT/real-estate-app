import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Buy', path: '/' },
    { label: 'Sell', path: '/seller' },
    { label: 'Admin', path: '/admin' },
  ];

  const dashboardRoute = user
    ? user.role === 'seller'
      ? { label: 'Dashboard', path: '/seller' }
      : user.role === 'admin'
      ? { label: 'Admin Panel', path: '/admin' }
      : { label: 'Dashboard', path: '/buyer' }
    : null;

  if (dashboardRoute) {
    menuItems.push(dashboardRoute);
  }

  return (
    <>
      <AppBar position="sticky" sx={{ top: 0, zIndex: 1100, background: "#1976d2" }}>
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "white" }}
          >
            RealEstate
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={Link}
                to={item.path}
              >
                {item.label}
              </Button>
            ))}

            {!user ? (
              <Button color="inherit" onClick={handleLogin}>
                Login
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.label}
                component={Link}
                to={item.path}
                onClick={toggleDrawer}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}

            {!user ? (
              <ListItem button onClick={handleLogin}>
                <ListItemText primary="Login" />
              </ListItem>
            ) : (
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;