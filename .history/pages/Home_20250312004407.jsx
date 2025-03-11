import React, { useEffect, useState } from "react";
import { categoryMovies } from "../services/api";
import { NOWPLAYING_API_URL } from "../constants/constant";
import { Box, styled, useTheme, useMediaQuery } from "@mui/material";
import Banner from "../components/Banner";
import UpNext from "../components/UpNext";
import Slide from "../components/Slide";

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  padding: "20px 0",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Component = styled(Box)(({ theme }) => ({
  padding: "0 115px",
  [theme.breakpoints.down("md")]: {
    padding: "0 50px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0 20px",
  },
}));

const Home = () => {
  const [movies, setMovies] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await categoryMovies(
          `${NOWPLAYING_API_URL}?api_key=${import.meta.env.VITE_API_KEY}`
        );
        setMovies(response?.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
    getData();
  }, []);

  return (
    <Component>
      <Wrapper>
        <Banner movies={movies} />
        {!isMobile && <UpNext movies={movies} />}
      </Wrapper>
      <Slide movies={movies} />
    </Component>
  );
};

export default Home;
