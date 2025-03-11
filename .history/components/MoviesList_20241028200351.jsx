import { Star } from "@mui/icons-material";
import { List, ListItem, Typography, styled } from "@mui/material";
import React from "react";

const Banner = styled("img")({
  width: 47,
});

const Container = styled(List)`
  display: flex;
`;

const MoviesList = ({ movies }) => {
  return (
    <>
      {movies?.map((movie) => (
        <Container key={movie?.id}>
          <ListItem>
            <Banner
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt={movie?.title}
            />
          </ListItem>
          <ListItem>
            <Typography>{movie?.original_title}</Typography>
          </ListItem>
          <ListItem>
            <Star color="warning" />
            <Typography>{movie?.vote_average}</Typography>
          </ListItem>
          <ListItem>
            <Typography>{movie?.release_date}</Typography>
          </ListItem>
        </Container>
      ))}
    </>
  );
};

export default MoviesList;
