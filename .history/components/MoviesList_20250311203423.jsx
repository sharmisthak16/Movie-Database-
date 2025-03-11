import { Star } from "@mui/icons-material";
import { List, ListItem, Typography, styled } from "@mui/material";
import React from "react";

const Banner = styled("img")(({ theme }) => ({
  width: 47,
  borderRadius: 4,
  [theme.breakpoints.down("sm")]: {
    width: 35,
  },
}));

const Container = styled(List)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const Rating = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(1),
}));

const MoviesList = ({ movies }) => {
  if (!Array.isArray(movies)) {
    return <Typography>No movies available</Typography>;
  }

  return (
    <>
      {movies.map((movie) => (
        <Container key={movie?.id}>
          <ListItem>
            <Banner
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt={movie?.title || "Movie Poster"}
            />
          </ListItem>
          <ListItem>
            <Typography variant="h6">{movie?.original_title}</Typography>
          </ListItem>
          <ListItem>
            <Rating>
              <Star color="warning" />
              <Typography variant="body2">{movie?.vote_average}</Typography>
            </Rating>
          </ListItem>
          <ListItem>
            <Typography variant="body2">{movie?.release_date}</Typography>
          </ListItem>
        </Container>
      ))}
    </>
  );
};

export default MoviesList;
