import React from 'react'
import { UserThemeContext } from "../../store/ThemeContext";
import { useContext } from "react";

import classes from './trendItem.module.css'

const TrendItem = (props) => {
  const userTheme = useContext(UserThemeContext);
  return (
    <div
    className={`${classes.trendItem} ${
      userTheme.theme === "dark" ? classes.dark : ""
    }`}>
        <img src={props.coinImage} alt="coin image" />
        <p>{props.coinName}</p>
    </div>
  )
}

export default TrendItem