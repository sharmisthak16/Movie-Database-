import { Box, Typography, styled } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';

const Component = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "baseline",
  paddingLeft: "20px",
  [theme.breakpoints.down("md")]: {
    width: "90%",
    paddingLeft: "10px",
  },
  "& > p": {
    color: "#f5c518",
    fontWeight: 600,
    fontSize: "18px",
    marginBottom: "10px",
    [theme.breakpoints.down("md")]: {
      fontSize: "16px",
    },
  },
}));

const Poster = styled("img")(({ theme }) => ({
  width: "88px",
  [theme.breakpoints.down("md")]: {
    width: "60px",
  },
}));

const Wrapper = styled(Box)(({ theme }) => ({
  color: "#fff",
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  "& > p": {
    marginLeft: "20px",
    [theme.breakpoints.down("md")]: {
      marginLeft: "0",
      marginTop: "10px",
    },
  },
}));

const UpNext = ({ movies }) => {
  if (!Array.isArray(movies)) {
    return <Component><Typography>No upcoming movies</Typography></Component>;
  }

  return (
    <Component>
      <Typography>Up Next</Typography>
      {movies.slice(0, 3).map((movie) => (
        <Wrapper key={movie?.id}>
          <Poster
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt={movie?.title || "Movie Poster"}
          />
          <Typography>{movie?.original_title}</Typography>
        </Wrapper>
      ))}
    </Component>
  );
};

UpNext.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      original_title: PropTypes.string,
    })
  ).isRequired,
};

export default UpNext;
