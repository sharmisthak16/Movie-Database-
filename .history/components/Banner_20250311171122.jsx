import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 600 }, items: 1 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
};

const StyledBanner = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  objectFit: "cover",
  borderRadius: "8px",
  [theme.breakpoints.down("md")]: {
    height: "250px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "200px",
  },
}));

const BannerWrapper = styled(Box)(({ theme }) => ({
  width: "65%",
  margin: "auto",
  [theme.breakpoints.down("md")]: {
    width: "90%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const Banner = ({ movies }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <BannerWrapper>
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
    </BannerWrapper>
  );
};

export default Banner;
