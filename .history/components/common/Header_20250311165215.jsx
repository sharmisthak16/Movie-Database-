import React, { useState } from "react";
import {
  AppBar,
  Box,
  InputBase,
  Toolbar,
  Typography,
  styled,
  IconButton,
  Drawer,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { logoURL } from "../../constants/constant";
import { BookmarkAdd, ExpandMore, Menu, Close } from "@mui/icons-material";
import HeaderMenu from "./HeaderMenu";
import { routePath } from "../../constants/routes";
import { Link } from "react-router-dom";

const StyledAppBar = styled(AppBar)`
  background: #222;
  min-height: 56px !important;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  @media (min-width: 768px) {
    padding: 0 115px;
  }
`;

const StyledInputBase = styled(InputBase)`
  background: #fff;
  height: 30px;
  width: 100%;
  max-width: 500px;
  border-radius: 5px;
  padding: 0 8px;
`;

const Logo = styled("img")({
  width: 64,
});

const Header = () => {
  const [open, setOpen] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        {isMobile ? (
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
            <Menu />
          </IconButton>
        ) : (
          <Link to={routePath.home}>
            <Logo src={logoURL} alt="imdb logo" />
          </Link>
        )}

        {!isMobile && (
          <Box onClick={(e) => setOpen(e.currentTarget)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
            <Menu />
            <Typography>Menu</Typography>
          </Box>
        )}
        <HeaderMenu open={open} setOpen={setOpen} />

        {!isMobile && <StyledInputBase placeholder="Search..." />}

        {!isMobile && (
          <Typography>
            IMDb<Box component="span">Pro</Box>
          </Typography>
        )}

        {!isMobile && (
          <Box display="flex" alignItems="center" gap={1}>
            <BookmarkAdd />
            <Typography>Watchlist</Typography>
          </Box>
        )}

        {!isMobile && <Typography>Sign In</Typography>}

        {!isMobile && (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography>EN</Typography>
            <ExpandMore />
          </Box>
        )}
      </StyledToolbar>

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box display="flex" justifyContent="flex-end" p={1}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <List>
          <ListItem button onClick={() => setDrawerOpen(false)}>Menu</ListItem>
          <ListItem button onClick={() => setDrawerOpen(false)}>IMDb Pro</ListItem>
          <ListItem button onClick={() => setDrawerOpen(false)}>Watchlist</ListItem>
          <ListItem button onClick={() => setDrawerOpen(false)}>Sign In</ListItem>
          <ListItem button onClick={() => setDrawerOpen(false)}>Language</ListItem>
        </List>
      </Drawer>
    </StyledAppBar>
  );
};

export default Header;
