import React, { useState, useCallback, useEffect } from "react";
import SearchBox from "../search-box/SearchBox";
import useHttp from "../../hooks/useHttp";
import Skeleton from "@mui/material/Skeleton";
import Pagination from '@mui/material/Pagination';
import CoinData from "../coin-data/CoinData";
import { UserThemeContext } from "../../store/ThemeContext";
import { useContext } from "react";

import classes from "./coinTable.module.css";
import NotFound from "../../pages/NotFound";

const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false";

const CoinTable = (props) => {
  const userTheme = useContext(UserThemeContext);
  const [coinArray, setCoinArray] = useState([]);
  const [filteredCoin, setFilteredCoin] = useState(coinArray);
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, error, sendRequest } = useHttp();

  const applyData = useCallback((data) => {
    setCoinArray(data);
  }, []);

  

  useEffect(() => {
    sendRequest({ url: url }, applyData);
  }, [sendRequest, applyData]);

  const filterHandler = useCallback(filteredData => {
    setFilteredCoin(filteredData)
    setCurrentPage(1)
  },[])

  return (
    <>
    <SearchBox allData={coinArray} onSearch={filterHandler} />
    <div className={classes.tableWrapper}>
      <table
      cellSpacing={0}
      className={`${classes.table} ${
        userTheme.theme === "dark" ? classes.dark : ""
      }`}>
        <thead>
          <tr>
            <th>#</th>
            <th>Coins</th>
            <th>Price</th>
            <th>24h</th>
            <th>Volume(24h)</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <Skeleton variant="rectangular" width={`100%`} height={80} count={20} />
          )}
          {error && <NotFound />}
          {!isLoading &&
            !error &&
            filteredCoin
              .slice((currentPage - 1) * 20, (currentPage - 1) * 20 + 20)
              .map((coin) => <CoinData key={coin.id} coinInfo={coin} />)}
        </tbody>
      </table>
    </div>
    <div className={classes.pagination}>
    <Pagination
          count={+(filteredCoin.length / 20).toFixed(0)}
          color="primary"
          onChange={(e, pageNum) => {
            setCurrentPage(pageNum);
          }}
          style={{color:'#fff'}}
        />
    </div>
    </>
  );
};

export default CoinTable;
