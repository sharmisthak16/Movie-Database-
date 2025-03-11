import React, { useState } from "react";
import {
  AppBar,
  Box,
  InputBase,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { logoURL } from "../../constants/constant";
import { BookmarkAdd, ExpandMore, Menu } from "@mui/icons-material";
import HeaderMenu from "./HeaderMenu";
import { routePath } from "../../constants/routes";
import { Link } from "react-router-dom";

// Custom styles
const StyledAppBar = styled(AppBar)`
  background: #222;
  min-height: 56px !important;
`;

const StyledToolbar = styled(Toolbar)`
  padding: 0 115px !important;
  display: flex;
  justify-content: space-between;
  & > * {
    padding: 0 16px;
  }
  & > div {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 4px;
    & > p {
      font-size: 14px;
      font-weight: 600;
    }
  }
  & > p {
    font-size: 14px;
    font-weight: 600;
  }
`;

const StyledInputBase = styled(InputBase)`
  background: #fff;
  height: 30px;
  width: 55%;
  border-radius: 5px;
`;

const Logo = styled("img")({
  width: 64,
});

const Header = () => {
  const [open, setOpen] = useState(null);

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Link to={routePath.home}>
          <Logo
            src={logoURL}
            alt="imdb logo"
          />
        </Link>
        <Box onClick={(e) => setOpen(e.currentTarget)}>
          <Menu />
          <Typography>Menu</Typography>
        </Box>
        <HeaderMenu
          open={open}
          setOpen={setOpen}
        />
        <StyledInputBase />
        <Typography>
          IMDb<Box component="span">Pro</Box>
        </Typography>
        <Box>
          <BookmarkAdd />
          <Typography>Watchlist</Typography>
        </Box>
        <Typography>Sign In</Typography>
        <Box>
          <Typography>EN</Typography>
          <ExpandMore />
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
