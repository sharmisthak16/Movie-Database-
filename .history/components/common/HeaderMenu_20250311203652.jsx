import { Menu, MenuItem, Drawer, List, ListItem, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import { routePath } from "../../constants/routes";

const HeaderMenu = ({ open, setOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => setOpen(null);

  if (isMobile) {
    return (
      <Drawer anchor="left" open={Boolean(open)} onClose={handleClose}>
        <IconButton onClick={handleClose} style={{ alignSelf: "flex-end", margin: 8 }}>
          <Close />
        </IconButton>
        <List>
          <ListItem button component={Link} to={`${routePath.categories}?category=popular`} onClick={handleClose}>
            Popular
          </ListItem>
          <ListItem button component={Link} to={`${routePath.categories}?category=toprated`} onClick={handleClose}>
            Top Rated
          </ListItem>
          <ListItem button component={Link} to={`${routePath.categories}?category=upcoming`} onClick={handleClose}>
            Upcoming
          </ListItem>
        </List>
      </Drawer>
    );
  }

  return (
    <Menu
      id="demo-positioned-menu"
      anchorEl={open}
      open={Boolean(open)}
      onClose={handleClose}
    >
      <Link to={`${routePath.categories}?category=popular`} style={{ textDecoration: "none", color: "inherit" }}>
        <MenuItem onClick={handleClose}>Popular</MenuItem>
      </Link>
      <Link to={`${routePath.categories}?category=toprated`} style={{ textDecoration: "none", color: "inherit" }}>
        <MenuItem onClick={handleClose}>Top Rated</MenuItem>
      </Link>
      <Link to={`${routePath.categories}?category=upcoming`} style={{ textDecoration: "none", color: "inherit" }}>
        <MenuItem onClick={handleClose}>Upcoming</MenuItem>
      </Link>
    </Menu>
  );
};

export default HeaderMenu;
