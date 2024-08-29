import React from 'react';
import { useTheme, Typography, IconButton, TextField, Button, Box } from '@mui/material';
import { Facebook, Instagram, Twitter, YouTube, LinkedIn, LocationOn, Phone, Mail } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { styled } from '@mui/system';
import Logo from './mlf1.png';
import "./Footer.css";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFFFFF',  // Set background color to white
  color: theme.palette.mode === 'dark' ? '#E5E8EF' : '#333',
  padding: '20px',
  borderRadius: '10px',  // Add border radius
  transition: 'all 0.3s ease', // Smooth transition for theme changes
}));

const SocialMediaIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#E5E8EF' : '#333',
}));

const Footer = () => {
  const theme = useTheme();
  // const isDarkMode = theme.palette.mode === 'dark';
  const isDarkMode = useSelector((state) => state.darkMode.darkMode);

  return (

    <FooterContainer>
      <div className='cs_form'>
        <Box>
          <img src={Logo} alt="Logo" style={{ width: '150px' }} />
          <Box display="flex" gap={1} mt={2}>
            <SocialMediaIcon>
              <Facebook />
            </SocialMediaIcon>
            <SocialMediaIcon>
              <Instagram />
            </SocialMediaIcon>
            <SocialMediaIcon>
              <Twitter />
            </SocialMediaIcon>
            <SocialMediaIcon>
              <YouTube />
            </SocialMediaIcon>
            <SocialMediaIcon>
              <LinkedIn />
            </SocialMediaIcon>
          </Box>
          <Typography variant="body2" mt={2}>
            Copyright © 2024 Created By Kavaskar, Likitha Yadav G. All Rights Reserved.
          </Typography>
          <Typography variant="body2" mt={2}>
            <LocationOn fontSize="small" /> Christ University<br />
            Dairy Circle, Karnataka-56001
          </Typography>
          <Typography variant="body2" mt={2}>
            <Phone fontSize="small" /> +91-1234-567-890<br />
            <Mail fontSize="small" />&nbsp; MindCare@gmail.com
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: '80px',
          }}
        >
          <Typography variant="h6" color={isDarkMode ? '#fff' : '#333'}>
            Our Newsletter
          </Typography>
          <Box
            sx={{
              background: isDarkMode
                ? 'linear-gradient(to right, #FA4B37, #DF2771)'
                : 'linear-gradient(to right, #FF5733, #FFC300)',
              height: '4px',
              width: '100px',
              borderRadius: '2px',
              my: 2,
              marginTop: '10px',
            }}
          />
          <Typography variant="body2" mb={2}>
            Enter Your Email to get our News and updates.
          </Typography>
          <Box component="form" noValidate autoComplete="off" display="flex" flexDirection="column" gap={1}>
            <TextField
              variant="outlined"
              placeholder="Enter Your Email"
              type="email"
              InputProps={{
                style: {
                  background: isDarkMode ? '#343A40' : '#e0e0e0',
                  color: isDarkMode ? 'white' : '#333',
                  width: '300px',
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 1 }}
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
  