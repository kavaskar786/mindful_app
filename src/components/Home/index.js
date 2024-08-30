import React from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import "./Home.css";
import ContactUs from "../ContactUs/index.js";
import Footer from "../Footer/Footer.js";
import slideImages from "./slideImages.json";
import LandingPage from "../HomePage/index.js";


const Home = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  // Limit to four images
  const limitedSlides = slideImages.slice(0, 4);

  return (
    
    <Box
      className="container"
      sx={{
        backgroundColor: darkMode ? "#000000" : "#f8f8f8",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
      < LandingPage />
      <Container maxWidth="lg">
        <motion.div initial="hidden" animate="visible" className="gomma" variants={cardVariants} transition={{ duration: 1 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }} mt={2}>
            Services provided by the MindCare
          </Typography>
          {/* <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "medium" }} mt={2}>
            The app is divided into the following categories:
          </Typography> */}
        </motion.div>
        <Grid container spacing={4} mt={2}>
          {limitedSlides.map((slide, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  className={`card ${darkMode ? "cardDark" : "cardLight"}`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "400px", // Set a fixed height for the card
                  }}
                >
                  <img
                    src={slide.image} // Assuming slide.image holds the image path
                    alt={slide.title}
                    className="cardImage"
                    style={{ width: "100%", height: "300px", objectFit: "cover" }} // Ensure image fits within the card
                  />
                  <CardContent
                    className="cardContent"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%", // Ensure content stretches to fill the card
                    }}
                  >
                    <Typography variant="h6" className="cardTitle">
                      {slide.title}
                    </Typography>
                    <Typography variant="body1" className="cardDescription">
                      {slide.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <ContactUs />
      <Footer />
    </Box>
  );
};

export default Home;
