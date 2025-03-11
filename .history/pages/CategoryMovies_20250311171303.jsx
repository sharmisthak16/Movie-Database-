import React, { useEffect, useState } from "react";
import { Box, Divider, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
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

// Styling for banner images
const StyledBanner = styled("img")(({ theme }) => ({
  width: "100%",
  height: "500px",
  objectFit: "cover",
  borderRadius: "8px",
  [theme.breakpoints.down("md")]: {
    height: "400px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "250px",
  },
}));

// Main container for the section
const Component = styled(Box)`
  width: 83%;
  margin: auto;
`;

// Styling for title section below the hero
const TitleContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  background: "#222",
  color: "#fff",
  padding: "20px",
  marginTop: "10px",
  borderRadius: "8px",
  [theme.breakpoints.down("md")]: {
    padding: "15px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  },
}));

// Styling for the content section
const Container = styled(Box)`
  background: #f5f5f5;
  padding: 10px;
`;

// Main Component
const CategoryMovies = () => {
  const [movies, setMovies] = useState([]);
  const { search } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const getData = async () => {
      let API_URL;
      if (search.includes("popular")) API_URL = POPULAR_API_URL;
      else if (search.includes("toprated")) API_URL = TOPRATED_API_URL;
      else if (search.includes("upcoming")) API_URL = UPCOMING_API_URL;

      const response = await categoryMovies(API_URL);
      setMovies(response.results);
    };
    getData();
  }, [search]);

  return (
    <>
      <Component>
        {/* Hero Section with Carousel */}
        <Carousel
          responsive={responsive}
          swipeable
          draggable
          infinite
          autoPlay
          autoPlaySpeed={3000}
          keyBoardControl
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

        {/* IMDB-style Title Section */}
        <TitleContainer>
          <Typography variant={isMobile ? "h6" : "h5"}>IMDB Charts</Typography>
          <Typography variant={isMobile ? "h5" : "h4"}>IMDB {movieType[search.split("=")[1]]} Movies</Typography>
          <Typography variant="body2">
            IMDB Top {movies?.length} as rated by regular IMDB voters
          </Typography>
        </TitleContainer>

        {/* Movie List */}
        <Container>
          <MoviesList movies={movies} />
        </Container>
      </Component>
    </>
  );
};

export default CategoryMovies;
