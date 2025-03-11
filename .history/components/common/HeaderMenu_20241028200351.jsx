import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { routePath } from "../../constants/routes";

const HeaderMenu = ({ open, setOpen }) => {
  const openMenu = Boolean(open);

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={open}
      open={openMenu}
      onClose={handleClose}
    >
      <Link
        to={`${routePath.categories}?category=popular`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <MenuItem onClick={handleClose}>Popular</MenuItem>
      </Link>
      <Link
        to={`${routePath.categories}?category=toprated`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <MenuItem onClick={handleClose}>Top Rated</MenuItem>
      </Link>
      <Link
        to={`${routePath.categories}?category=upcoming`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <MenuItem onClick={handleClose}>Upcoming</MenuItem>
      </Link>
    </Menu>
  );
};

export default HeaderMenu;
