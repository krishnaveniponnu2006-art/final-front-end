import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            BlogApp
          </Typography>

          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/add" color="inherit">
            Add
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
