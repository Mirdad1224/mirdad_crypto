import React from "react";
import Logo from "../../Assets/images/logo.png";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { Link } from "react-router-dom";
import { UserThemeContext } from "../../store/ThemeContext";
import { useContext } from "react";

import classes from "./navbar.module.css";

const Navbar = () => {
  const userTheme = useContext(UserThemeContext);

  const themeHandler = () => {
    let currentTheme = localStorage.getItem('theme')
    if (!currentTheme){
      localStorage.setItem('theme', 'dark')
      userTheme.setTheme('dark')
    } else if(currentTheme === 'light'){
      localStorage.setItem('theme', 'dark')
      userTheme.setTheme('dark')
    } else {
      localStorage.setItem('theme', 'light')
      userTheme.setTheme('light')
    }
  }

  return (
    <nav
      className={`${classes.navbar} ${
        userTheme.theme === "dark" ? classes.dark : ""
      }`}
    >
      <Link to="/" className={classes.logo}>
        <h1>MirdadCoin</h1>
        <img src={Logo} alt="" />
      </Link>
      <div className={classes.theme}>
        {userTheme.theme === 'dark' && <LightModeIcon onClick={themeHandler} />}
        {userTheme.theme !== 'dark' && <NightlightRoundIcon onClick={themeHandler} />}
      </div>
    </nav>
  );
};

export default Navbar;
