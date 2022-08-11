import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserThemeContext } from "../../store/ThemeContext";
import { useContext } from "react";


import classes from './coinData.module.css'

const CoinData = ({coinInfo}) => {
  const userTheme = useContext(UserThemeContext);
  const navigate = useNavigate()

  const navigateHandler = () => {
    const coinId = coinInfo.id
    navigate(`/${coinId}`)
  }


    const rank = coinInfo.market_cap_rank
    const coinName = coinInfo.name
    const imageSource = coinInfo.image
    const symbol = coinInfo.symbol.toUpperCase();
    const price = coinInfo.current_price.toLocaleString()
    const pricrChangePrecentage = coinInfo.price_change_percentage_24h.toFixed(2)
    const totalVolume = coinInfo.total_volume.toLocaleString()
    const marketCap = coinInfo.market_cap.toLocaleString()

  return (
    <tr
    className={`${classes.coinInfo} ${
      userTheme.theme === "dark" ? classes.dark : ""
    }`} onClick={navigateHandler}>
        <td>{rank}</td>
        <td>
            <div className={classes.basicInfo}>
                <img src={imageSource} alt="" />
                <span className={classes.coinName}>{coinName}</span>
                <span>{symbol}</span>
            </div>
        </td>
        <td>${price}</td>
        <td>{pricrChangePrecentage}%</td>
        <td>${totalVolume}</td>
        <td>${marketCap}</td>
    </tr>
  )
}

export default CoinData