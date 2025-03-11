import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
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
  padding: "15px",
  borderRadius: "8px",
  marginTop: "20px",
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  },
}));

const Loader = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "500px",
});

const CategoryMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { search } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        let API_URL;
        const category = search.split("=")[1];
        if (category === "popular") API_URL = POPULAR_API_URL;
        else if (category === "toprated") API_URL = TOPRATED_API_URL;
        else if (category === "upcoming") API_URL = UPCOMING_API_URL;

        const response = await categoryMovies(API_URL);
        setMovies(response.results);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [search]);

  if (loading) {
    return (
      <Loader>
        <CircularProgress />
      </Loader>
    );
  }

  if (error) {
    return (
      <Component>
        <Typography variant="h6" textAlign="center">
          {error}
        </Typography>
      </Component>
    );
  }

  return (
    <Component>
      <Carousel
        responsive={responsive}
        swipeable
        draggable
        infinite
        autoPlay={!isMobile}
        autoPlaySpeed={3000}
        keyBoardControl
        slidesToSlide={1}
      >
        {movies?.map((movie) => (
          <StyledBanner
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt={movie?.title || "Movie Banner"}
            key={movie?.id}
          />
        ))}
      </Carousel>
      <Container>
        <Typography variant="h6" textAlign="center">
          IMDb Charts
        </Typography>
        <Typography
          variant="h4"
          fontSize={isMobile ? "1.5rem" : "2rem"}
          textAlign="center"
        >
          IMDb {movieType[search.split("=")[1]]} Movies
        </Typography>
        <Typography
          style={{
            fontSize: isMobile ? "12px" : "14px",
            margin: "10px 0",
            textAlign: "center",
          }}
        >
          IMDb Top {movies?.length} as rated by regular IMDb voters
        </Typography>
        <Divider />
        <MoviesList movies={movies} />
      </Container>
    </Component>
  );
};

export default CategoryMovies;
