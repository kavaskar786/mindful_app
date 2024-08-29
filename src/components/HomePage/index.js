import React, { useRef } from 'react';
import { Button, Container, Box, Typography } from '@mui/material';
import './LandingPage.css'; // Import the CSS file
import img from './heroimage.png';
import { useSelector } from "react-redux";

const LandingPage = () => {
  const belowSectionRef = useRef(null);

  const scrollToSection = () => {
    const element = document.querySelector('.gomma');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } 
  };

  const darkMode = useSelector((state) => state.darkMode.darkMode);
  

  return (
    <Box
      className="container"
      sx={{
        backgroundColor: darkMode ? "#000000" : "#f8f8f8",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
    <Container className="landing-page" maxWidth="false">

        <div className='flex'>

      <div className="left-content" >
        <Typography variant="h1" className='test'>Welcome to MindCare</Typography>
        <Typography variant="p" className='test1'>Discover a new way to take care of your mental well-being with personalized insights and support</Typography>
        <div className='btn'>
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
       <img src={img} alt='-' width={720}/>
      </div>


       </div>
    </Container>
    </Box>
  );
}

export default LandingPage;
