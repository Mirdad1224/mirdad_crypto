import React, { useState, useCallback, useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import Skeleton from "@mui/material/Skeleton";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { UserThemeContext } from "../../store/ThemeContext";
import { useContext } from "react";

import classes from "./coinDiagram.module.css";

const CoinDiagram = ({ coinId }) => {
  const userTheme = useContext(UserThemeContext);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("prices");
  const [chartData, setChartData] = useState(null);
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${currentDay}`;

  const applyData = useCallback((data) => {
    currentCategory === "prices"
      ? setChartData(data.prices)
      : setChartData(data.market_caps);
  }, [currentCategory]);

  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    sendRequest({ url: url }, applyData);
  }, [sendRequest, applyData, url]);

  return (
    <>
    <div
      className={`${classes.chartWrapper} ${
        userTheme.theme === "dark" ? classes.dark : ""
      }`}>
      <div className={classes.selection}>
        <div>
          <span onClick={() => setCurrentCategory("prices")}>Prices</span>
          <span onClick={() => setCurrentCategory("market_cap")}>
            Market Cap
          </span>
        </div>
        <div>
          <span onClick={() => setCurrentDay(1)}>1 Day</span>
          <span onClick={() => setCurrentDay(30)}>1 Month</span>
          <span onClick={() => setCurrentDay(180)}>6 Month</span>
          <span onClick={() => setCurrentDay(365)}>1 Year</span>
        </div>
      </div>
      
    </div>
    <div
      className={`${classes.chart} ${
        userTheme.theme === "dark" ? classes.darkChart : ""
      }`}>
    {isLoading && (
      <Skeleton variant="rectangular" width={`100%`} height={300} />
    )}
    {error && <p>{error}</p>}
    {!isLoading && !error && chartData && (
      <Line
        data={{
          labels: chartData.map((coinData) => {
            let date = new Date(coinData[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;

            return currentDay === 1 ? time : date.toLocaleDateString();
          }),
          datasets: [
            {
              data: chartData.map((coinData) => {
                return coinData[1];
              }),
              label: `${currentCategory} from Past ${currentDay} days in usd`,
              borderColor: "#1E90FF",
              borderWidth: 1,
              hoverBorderColor: "#002244",
              hoverBorderJoinStyle: "round",
              fill: true,
              backgroundColor: "rgba(210, 228, 241, 0.8)",
              borderJoinStyle: "round",
            },
          ],
        }}
        height={240}
        options={{
          elements: {
            point: {
              radius: 2,
              backgroundColor: "#002244",
            },
          },
        }}
      />
    )}
  </div>
  </>
  );
};

export default CoinDiagram;
