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

  const guestMenuItems = [
    { label: 'Home', path: '/' },
    { label: 'Properties', path: '/properties' },
    { label: 'Featured', path: '/#featured' },
  ];

  const buyerMenuItems = [
    { label: 'Home', path: '/' },
    { label: 'Properties', path: '/properties' },
    { label: 'Wishlist ❤️', path: '/#wishlist' },
    { label: 'Inquiries', path: '/buyer/inquiries' },
    { label: 'Dashboard', path: '/buyer' },
  ];

  const sellerMenuItems = [
    { label: 'Home', path: '/' },
    { label: 'Add Property', path: '/seller/add' },
    { label: 'Inquiries', path: '/seller/inquiries' },
    { label: 'Dashboard', path: '/seller' },
  ];

  const authMenuItems = [
    { label: 'Home', path: '/' },
    { label: 'Buy', path: '/' },
    { label: 'Sell', path: '/seller' },
    { label: 'Admin', path: '/admin' },
  ];

  const menuItems = user
    ? user.role === 'buyer'
      ? buyerMenuItems
      : user.role === 'seller'
      ? sellerMenuItems
      : [...authMenuItems]
    : guestMenuItems;

  const dashboardRoute = user && user.role === 'admin'
    ? { label: 'Admin Panel', path: '/admin' }
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
                onClick={item.label === 'Home' ? () => window.scrollTo({ top: 0, behavior: 'smooth' }) : undefined}
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
                onClick={() => {
                  toggleDrawer();
                  if (item.label === 'Home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
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