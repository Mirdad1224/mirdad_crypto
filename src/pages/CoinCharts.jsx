import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import AboutCoin from "../components/about-coin/AboutCoin";
import useHttp from "../hooks/useHttp";
import Skeleton from "@mui/material/Skeleton";

import classes from "./coinCharts.module.css";
import CoinPrice from "../components/coin-price/CoinPrice";
import CoinDiagram from "../components/coin-diagram/CoinDiagram";
import NotFound from "./NotFound";

const CoinCharts = () => {
  const params = useParams();
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;

  const [coinData, setCoinData] = useState(null);

  const applyData = useCallback((data) => {
    setCoinData(data);
  }, []);

  const { isLoading, error, sendRequest } = useHttp();
  
  useEffect(() => {
    sendRequest({ url: url }, applyData);
  }, [sendRequest, applyData, url]);

  return (
    <div className={classes.coinData}>
      {isLoading && (
        <Skeleton variant="rectangular" width={`100%`} height={800} />
      )}
      {error && <NotFound />}
      {!isLoading && !error && coinData && (
        <div className={classes.crypto}>
          <AboutCoin coinInfo={coinData} />
          <CoinPrice coinInfo={coinData} />
          <CoinDiagram coinId={params.coinId} />
        </div>
      )}
    </div>
  );
};

export default CoinCharts;
