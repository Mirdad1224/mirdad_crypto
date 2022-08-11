import React from "react";
import Chip from "@mui/material/Chip";
import { UserThemeContext } from "../../store/ThemeContext";
import { useContext } from "react";

import classes from "./coinPrice.module.css";

const CoinPrice = ({ coinInfo }) => {
  const userTheme = useContext(UserThemeContext);
  const name = coinInfo.name;
  const price = coinInfo.market_data.current_price.usd.toLocaleString();
  const priceChangePercentage =
    coinInfo.market_data.price_change_percentage_24h.toFixed(2);
  const lowPrice = coinInfo.market_data.low_24h.usd.toLocaleString();
  const highPrice = coinInfo.market_data.high_24h.usd.toLocaleString();
  const marketCap = coinInfo.market_data.market_cap.usd.toLocaleString();
  const volume = coinInfo.market_data.total_volume.usd.toLocaleString();
  const circulatingSupply =
    coinInfo.market_data.circulating_supply.toLocaleString();

  return (
    <div
    className={`${classes.priceWrapper} ${
      userTheme.theme === "dark" ? classes.dark : ""
    }`}>
      <h2>{name} Price</h2>
      <div>
        <span>$ {price}</span>
        <Chip
         className={classes.badge}
          label={priceChangePercentage >= 0 ? `+ ${priceChangePercentage} %` : `${priceChangePercentage} %`}
          color={priceChangePercentage >= 0 ? "success" : "error"}
        />
      </div>
      <div>
        <span>Low : $ {lowPrice}</span>
        <Chip className={classes.badge} label="Last 24h" color="primary" size="small" />
        <span>High : $ {highPrice}</span>
      </div>
      <div>
        <span>Market Cap:</span>
        <span>$ {marketCap}</span>
      </div>
      <div>
        <span>Volume :</span>
        <span>$ {volume}</span>
      </div>
      <div>
        <span>Circulating Supply :</span>
        <span>$ {circulatingSupply}</span>
      </div>
    </div>
  );
};

export default CoinPrice;
