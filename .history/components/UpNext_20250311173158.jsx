import { Box, Typography, styled, useTheme, useMediaQuery } from "@mui/material";
import React from "react";

const Component = styled(Box)(({ theme }) => ({
  width: "40%",
  display: "flex",
  flexDirection: "column",
  alignItems: "baseline",
  paddingLeft: "20px",
  "& > p": {
    color: "#f5c518",
    fontWeight: 600,
    fontSize: "18px",
    marginBottom: "10px",
  },
  [theme.breakpoints.down("md")]: {
    width: "60%",
    paddingLeft: "10px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    alignItems: "center",
    paddingLeft: "0px",
    textAlign: "center",
  },
}));

const Poster = styled("img")(({ theme }) => ({
  width: "88px",
  [theme.breakpoints.down("sm")]: {
    width: "70px",
  },
}));

const Wrapper = styled(Box)(({ theme }) => ({
  color: "#fff",
  display: "flex",
  alignItems: "center",
  "& > p": {
    marginLeft: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
    "& > p": {
      marginLeft: "10px",
      fontSize: "14px",
    },
  },
}));

const UpNext = ({ movies }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Component>
      <Typography>Up Next</Typography>
      {movies?.slice(0, 3).map((movie) => (
        <Wrapper key={movie?.id}>
          <Poster
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt={movie?.title}
          />
          <Typography fontSize={isMobile ? "14px" : "16px"}>{movie?.original_title}</Typography>
        </Wrapper>
      ))}
    </Component>
  );
};

export default UpNext;
