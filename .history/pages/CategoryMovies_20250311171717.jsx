import React, { useEffect, useState } from "react";
import { Box, Divider, Typography, styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { categoryMovies } from "../services/api";
import { useLocation } from "react-router-dom";
import {
  POPULAR_API_URL,
  TOPRATED_API_URL,
  UPCOMING_API_URL,
  movieType,
} from "../constants/constant";
import MoviesList from "../components/MoviesList";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const StyledBanner = styled("img")({
  width: "100%",
  height: "500px",
});

const Component = styled(Box)`
  width: 83%;
  margin: auto;
`;

const Container = styled(Box)`
  background: #f5f5f5;
  padding: 10px;
`;

const CategoryMovies = () => {
  const [movies, setMovies] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const getData = async () => {
      let API_URL;
      if (search.split("=")[1] == "popular") API_URL = POPULAR_API_URL;
      else if (search.split("=")[1] == "toprated") API_URL = TOPRATED_API_URL;
      else if (search.split("=")[1] == "upcoming") API_URL = UPCOMING_API_URL;

      const response = await categoryMovies(API_URL);
      setMovies(response.results);
    };
    getData();
  }, [search]);

  return (
    <>
      <Component>
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
          {movies?.map((movie) => (
            <StyledBanner
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt={movie?.title}
              key={movie?.id}
            />
          ))}
        </Carousel>
        <Container>
          <Typography variant="h6">IMDB Charts</Typography>
          <Typography variant="h4">
            IMDB {movieType[search.split("=")[1]]} Movies
          </Typography>
          <Typography style={{ fontSize: 12, margin: 5 }}>
            IMDB Top {movies?.length} as rated by regular IMDB voters
          </Typography>
          <Divider />
          <MoviesList movies={movies} />
        </Container>
      </Component>
    </>
  );
};

export default CategoryMovies;
