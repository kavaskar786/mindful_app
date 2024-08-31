import React, { useRef, useEffect } from "react";
import { Button, Container, Box, Typography } from "@mui/material";
import "./LandingPage.css"; // Import the CSS file
import img from "./heroimage.png";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

const LandingPage = () => {
  const belowSectionRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToSection = () => {
    const element = document.querySelector(".gomma");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    // Animation for the entire container
    gsap.from(containerRef.current, { opacity: 0, duration: 1 });

    // Animation for the text elements
    gsap.from(".test", { y: -50, opacity: 0, duration: 1.5, delay: 0.5 });
    gsap.from(".test1", { y: 50, opacity: 0, duration: 1.5, delay: 0.7 });

    // Animation for the button
    gsap.from(".gs", { scale: 0, opacity: 0, duration: 1.2, delay: 1 });

    // Animation for the image
    gsap.from(".below-section img", {
      scale: 0.8,
      opacity: 0,
      duration: 1.5,
      delay: 1.2,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  return (
    <Box
      ref={containerRef}
      className="container"
      sx={{
        backgroundColor: darkMode ? "#000000" : "#f8f8f8",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
      <Container className="landing-page" maxWidth="false">
        <div className="flex">
          <div className="left-content">
            <Typography variant="h1" className="test">
              Welcome to MindCare
            </Typography>
            <Typography variant="p" className="test1">
              Discover a new way to take care of your mental well-being with
              personalized insights and support
            </Typography>
            <div className="btn">
              <Button
                variant="contained"
                color="primary"
                className="gs"
                onClick={scrollToSection}
              >
                Get Started
              </Button>
            </div>
          </div>
          <div ref={belowSectionRef} className="below-section">
            <img src={img} alt="Hero" width={720} />
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default LandingPage;
