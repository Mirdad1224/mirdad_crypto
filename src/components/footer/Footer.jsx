import React from 'react'
import { UserThemeContext } from "../../store/ThemeContext";
import { useContext } from "react";

import classes from './footer.module.css'

const Footer = () => {
  const userTheme = useContext(UserThemeContext);
  return (
    <footer
    className={`${classes.copyright} ${
      userTheme.theme === "dark" ? classes.dark : ""
    }`}>
        <p>@2022 MirdadCoin All Rights Reserved</p>
    </footer>
  )
}

export default Footer