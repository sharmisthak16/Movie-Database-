import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

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
        <Box
          key={movie?.id}
          sx={{
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
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

export default UpNext;
