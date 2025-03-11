import React from "react";
import { Box, Typography, styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const StyledBanner = styled("img")`
  width: 100%;
  margin-top: 20px;
  border-radius: 8px;
`;

const Title = styled(Typography)`
  color: #fff;
  text-align: center;
  margin-top: 10px;
`;

const Slide = ({ movies }) => {
  if (!Array.isArray(movies)) {
    return <Typography>No movies available</Typography>;
  }

  return (
    <Carousel
      responsive={responsive}
      swipeable={false}
      draggable={false}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      slidesToSlide={1}
    >
      {movies.map((movie) => (
        <Box key={movie?.id} textAlign="center">
          <StyledBanner
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt={movie?.title || "Movie Poster"}
          />
          <Title variant="h6">{movie?.original_title}</Title>
        </Box>
      ))}
    </Carousel>
  );
};

export default Slide;
