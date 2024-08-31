import React, { useState, useEffect, useRef } from "react";
import { AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { gsap } from "gsap";
import {
  NavigationBarMenu,
  NavigationBarTitle,
  NavigationLinks,
  NavigationDrawer,
} from "./StyledComponent";
import darkTheme from "../../theme/darkTheme";
import lightTheme from "../../theme";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  height: theme.customAppBarHeight,
}));

// Main navigation bar component
const NavigationBar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const myTheme = darkMode ? darkTheme : lightTheme;

  const appBarRef = useRef(null);
  const menuRef = useRef(null);
  const titleRef = useRef(null);
  const linksRef = useRef(null);

  // Handler for opening the navigation drawer
  const openDrawer = () => {
    setIsOpenMenu(true);
  };

  // Handler for closing the navigation drawer
  const closeDrawer = () => {
    setIsOpenMenu(false);
  };

  // Handler for mouse leaving the navigation bar
  const handleMouseLeave = () => {
    setIsOpenMenu(false);
  };

  theme.customAppBarHeight = isMobile ? "50px" : "64px";

  useEffect(() => {
    // GSAP animations for the navigation bar elements
    gsap.fromTo(
      appBarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.from(menuRef.current, {
      opacity: 0,
      x: -50,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.2,
    });

    gsap.from(titleRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.7,
      ease: "power3.out",
      delay: 0.3,
    });

    gsap.from(linksRef.current, {
      opacity: 0,
      x: 50,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.4,
    });
  }, []);

  useEffect(() => {
    if (isOpenMenu) {
      gsap.to(".drawerClass", {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(".drawerClass", {
        x: "-100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [isOpenMenu]);

  return (
    <StyledAppBar
      position="sticky"
      onMouseLeave={handleMouseLeave}
      ref={appBarRef}
    >
      <Toolbar>
        <NavigationBarMenu
          ref={menuRef}
          isOpenMenu={isOpenMenu}
          openDrawer={openDrawer}
          myTheme={myTheme}
        />
        <NavigationBarTitle ref={titleRef} />
        <NavigationLinks ref={linksRef} user={user} myTheme={myTheme} />
      </Toolbar>
      <NavigationDrawer
        className="drawerClass"
        user={user}
        isOpenMenu={isOpenMenu}
        closeDrawer={closeDrawer}
        myTheme={myTheme}
      />
    </StyledAppBar>
  );
};

export default NavigationBar;
