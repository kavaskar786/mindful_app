import React from 'react';
import { Box, Button, Container, Grid, TextField, Typography, useTheme } from '@mui/material';


const ContactUs = () => {
  const theme = useTheme();
  const gradient = theme.palette.gradients ? theme.palette.gradients[theme.palette.mode] : 'linear-gradient(to right, #FA4B37, #DF2771)'; // Fallback gradient

  return (
    <Box
      id="contactus_section"
      sx={{
        textAlign: 'center',
        paddingY: { xs: 3, sm: 5 },
        paddingX: { xs: 2, sm: 4 },
        position: 'relative',
        overflow: 'hidden', // Ensures the skewed background does not overflow
      }}
    >
      <Typography
        variant="h3"
        
        sx={{
          marginBottom: { xs: 3, sm: 5 },
          fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
          lineHeight: { xs: 1.2, sm: 1.3 },
          zIndex: 1,
          
          position: 'relative',
        }}
      >
        Contact Us
      </Typography>

      <Box
        sx={{
          background: gradient,
          height: { xs: 200, sm: 250, md: 300 },
          position: 'absolute',
          width: '110%', // Slightly wider than the viewport to ensure full coverage
          left: '-5%', // Adjust the left position to cover the left edge properly
          top: 100,
          transformOrigin: 'top right',
          transform: 'skewY(-10deg)',
          zIndex: 0,
        }}
      />

      <Container
        sx={{
          marginTop: { xs: 3, sm: 5 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          position: 'relative',
          maxWidth: '100%', // Ensures the container does not overflow
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: 400 },
            padding: { xs: 2, sm: 3 },
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <form action="mailto:Likithayadvg9@gmail.com" method="post" encType="text/plain">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="fname"
                  required
                  variant="outlined"
                  sx={{ marginBottom: { xs: 2, sm: 3 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lname"
                  required
                  variant="outlined"
                  sx={{ marginBottom: { xs: 2, sm: 3 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="mail"
                  type="email"
                  required
                  variant="outlined"
                  sx={{ marginBottom: { xs: 2, sm: 3 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  required
                  variant="outlined"
                  sx={{ marginBottom: { xs: 2, sm: 3 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Details"
                  name="additional"
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 3,
                padding: { xs: '10px', sm: '12px' },
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              Send Message
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;