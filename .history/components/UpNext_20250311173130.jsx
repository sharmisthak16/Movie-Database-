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
  width: "100%",
  maxWidth: "1280px",
  margin: "auto",
  padding: "16px",
  [theme.breakpoints.down("md")]: {
    padding: "8px",
  },
}));

const Container = styled(Box)(({ theme }) => ({
  background: "#f5f5f5",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  },
}));

const Slide = styled(Carousel)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    ".react-multi-carousel-item": {
      textAlign: "center",
    },
  },
}));

const UpNext = ({ movies }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : "40%",
        display: "flex",
        flexDirection: "column",
        alignItems: isMobile ? "center" : "baseline",
        paddingLeft: isMobile ? "0px" : "20px",
        textAlign: isMobile ? "center" : "left",
      }}
    >
      <Typography sx={{ color: "#f5c518", fontWeight: 600, fontSize: "18px", marginBottom: "10px" }}>
        Up Next
      </Typography>
      {movies?.slice(0, 3).map((movie) => (
        <Box key={movie?.id} sx={{ color: "#fff", display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start" }}>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt={movie?.title}
            style={{ width: isMobile ? "70px" : "88px", marginRight: "10px" }}
          />
          <Typography fontSize={isMobile ? "14px" : "16px"}>{movie?.original_title}</Typography>
        </Box>
      ))}
    </Box>
  );
};

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
      <Slide
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
      </Slide>
      <Container>
        <Typography variant="h6" fontWeight="bold" color="primary">
          IMDB Charts
        </Typography>
        <Typography variant="h4" fontWeight="bold" fontSize={isMobile ? "1.5rem" : "2rem"}>
          IMDB {movieType[search.split("=")[1]]} Movies
        </Typography>
        <Typography style={{ fontSize: isMobile ? "12px" : "14px", margin: "5px" }}>
          IMDB Top {movies?.length} as rated by regular IMDB voters
        </Typography>
        <Divider style={{ margin: "10px 0" }} />
        <MoviesList movies={movies} />
      </Container>
      <UpNext movies={movies} />
    </Component>
  );
};

export default import { Box, Typography, styled, useTheme, useMediaQuery } from "@mui/material";
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
;
