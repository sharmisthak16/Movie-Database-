import React, { useEffect, useState } from "react";
import { Box, Divider, Typography, styled, useTheme, useMediaQuery } from "@mui/material";
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
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 600 }, items: 1 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
};

const StyledBanner = styled("img")(({ theme }) => ({
  width: "100%",
  height: "500px",
  objectFit: "cover",
  borderRadius: "8px",
  [theme.breakpoints.down("md")]: {
    height: "350px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "250px",
  },
}));

const Component = styled(Box)(({ theme }) => ({
  width: "83%",
  margin: "auto",
  [theme.breakpoints.down("md")]: {
    width: "95%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const Container = styled(Box)(({ theme }) => ({
  background: "#f5f5f5",
  padding: "10px",
  borderRadius: "8px",
  [theme.breakpoints.down("sm")]: {
    padding: "5px",
  },
}));

const CategoryMovies = () => {
  const [movies, setMovies] = useState([]);
  const { search } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const getData = async () => {
      let API_URL;
      if (search.split("=")[1] === "popular") API_URL = POPULAR_API_URL;
      else if (search.split("=")[1] === "toprated") API_URL = TOPRATED_API_URL;
      else if (search.split("=")[1] === "upcoming") API_URL = UPCOMING_API_URL;

      const response = await categoryMovies(API_URL);
      setMovies(response.results);
    };
    getData();
  }, [search]);

  return (
    <Component>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite={true}
        autoPlay={!isMobile}
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
        <Typography variant="h4" fontSize={isMobile ? "1.5rem" : "2rem"}>
          IMDB {movieType[search.split("=")[1]]} Movies
        </Typography>
        <Typography style={{ fontSize: isMobile ? "10px" : "12px", margin: "5px" }}>
          IMDB Top {movies?.length} as rated by regular IMDB voters
        </Typography>
        <Divider />
        <MoviesList movies={movies} />
      </Container>
    </Component>
  );
};

export default CategoryMovies;
