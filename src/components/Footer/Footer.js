import React, { useEffect, useRef } from "react";
import {
  useTheme,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  LinkedIn,
  LocationOn,
  Phone,
  Mail,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import Logo from "./mlf1.png";
import "./Footer.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF", // Set background color to white
  color: theme.palette.mode === "dark" ? "#E5E8EF" : "#333",
  padding: "20px",
  borderRadius: "10px", // Add border radius
  transition: "all 0.3s ease", // Smooth transition for theme changes
}));

const SocialMediaIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#E5E8EF" : "#333",
}));

const Footer = () => {
  const theme = useTheme();
  const isDarkMode = useSelector((state) => state.darkMode.darkMode);

  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) return; // Ensure footer is available

    // Select elements to animate
    const logo = footer.querySelector(".footer-logo");
    const socialIcons = footer.querySelectorAll(".social-icon");
    const texts = footer.querySelectorAll(".footer-text");
    const newsletter = footer.querySelector(".newsletter");
    const newsletterBar = footer.querySelector(".newsletter-bar");
    const newsletterText = footer.querySelector(".newsletter-text");
    const newsletterForm = footer.querySelector(".newsletter-form");

    // Create a GSAP timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 80%", // When the top of the footer hits 80% of the viewport height
        toggleActions: "play none none none",
      },
    });

    // Animate Logo
    tl.from(logo, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power3.out",
    })
      // Animate Social Icons
      .from(
        socialIcons,
        {
          opacity: 0,
          y: 20,
          stagger: 0.2,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      )
      // Animate Texts
      .from(
        texts,
        {
          opacity: 0,
          y: 20,
          stagger: 0.2,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      // Animate Newsletter Title
      .from(
        newsletter,
        {
          opacity: 0,
          x: -50,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.3"
      )
      // Animate Newsletter Bar
      .from(
        newsletterBar,
        {
          opacity: 0,
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      )
      // Animate Newsletter Text
      .from(
        newsletterText,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      )
      // Animate Newsletter Form
      .from(
        newsletterForm.children,
        {
          opacity: 0,
          y: 20,
          stagger: 0.2,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );
  }, []);

  return (
    <FooterContainer ref={footerRef}>
      <div className="cs_form">
        <Box>
          {/* Logo */}
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "150px" }}
            className="footer-logo animate"
          />

          {/* Social Media Icons */}
          <Box display="flex" gap={1} mt={2} className="social-icons">
            <SocialMediaIcon className="social-icon animate">
              <Facebook />
            </SocialMediaIcon>
            <SocialMediaIcon className="social-icon animate">
              <Instagram />
            </SocialMediaIcon>
            <SocialMediaIcon className="social-icon animate">
              <Twitter />
            </SocialMediaIcon>
            <SocialMediaIcon className="social-icon animate">
              <YouTube />
            </SocialMediaIcon>
            <SocialMediaIcon className="social-icon animate">
              <LinkedIn />
            </SocialMediaIcon>
          </Box>

          {/* Footer Texts */}
          <Typography variant="body2" mt={2} className="footer-text animate">
            Copyright © 2024 Created By Kavaskar, Likitha Yadav G. All Rights
            Reserved.
          </Typography>
          <Typography variant="body2" mt={2} className="footer-text animate">
            <LocationOn fontSize="small" /> Christ University
            <br />
            Dairy Circle, Karnataka-56001
          </Typography>
          <Typography variant="body2" mt={2} className="footer-text animate">
            <Phone fontSize="small" /> +91-1234-567-890
            <br />
            <Mail fontSize="small" />
            &nbsp; MindCare@gmail.com
          </Typography>
        </Box>

        {/* Newsletter Section */}
        <Box
          sx={{
            marginTop: "80px",
          }}
          className="newsletter animate"
        >
          <Typography variant="h6" color={isDarkMode ? "#fff" : "#333"}>
            Our Newsletter
          </Typography>

          {/* Newsletter Bar */}
          <Box
            sx={{
              background: isDarkMode
                ? "linear-gradient(to right, #FA4B37, #DF2771)"
                : "linear-gradient(to right, #FF5733, #FFC300)",
              height: "4px",
              width: "100px",
              borderRadius: "2px",
              my: 2,
              marginTop: "10px",
            }}
            className="newsletter-bar animate"
          />

          {/* Newsletter Description */}
          <Typography
            variant="body2"
            mb={2}
            className="newsletter-text animate"
          >
            Enter Your Email to get our News and updates.
          </Typography>

          {/* Newsletter Form */}
          <Box
            component="form"
            noValidate
            autoComplete="off"
            display="flex"
            flexDirection="column"
            gap={1}
            className="newsletter-form animate"
          >
            <TextField
              variant="outlined"
              placeholder="Enter Your Email"
              type="email"
              InputProps={{
                style: {
                  background: isDarkMode ? "#343A40" : "#e0e0e0",
                  color: isDarkMode ? "white" : "#333",
                  width: "300px",
                },
              }}
              className="animate"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 1 }}
              className="animate"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </div>
    </FooterContainer>
  );
};

export default Footer;
