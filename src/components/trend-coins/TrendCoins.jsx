import React, { useCallback, useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import Skeleton from "@mui/material/Skeleton";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import TrendItem from "../trend-item/TrendItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { UserThemeContext } from "../../store/ThemeContext";
import { useContext } from "react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper";

import classes from "./trendCoins.module.css";

const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h";

const TrendCoins = () => {
  const userTheme = useContext(UserThemeContext);
  const [trendArray, setTrendArray] = useState([]);

  const applyData = useCallback((data) => {
    setTrendArray(data);
  }, []);

  const { isLoading, error, sendRequest } = useHttp();
  useEffect(() => {
    sendRequest({ url: url }, applyData);
  }, [sendRequest, applyData]);

  const navigate = useNavigate();

  const navigateHandler = (id) => {
    navigate(id);
  };

  const sliderItems = trendArray.map((item) => (
    <SwiperSlide onClick={() => navigateHandler(item.id)} key={item.id}>
      <TrendItem coinImage={item.image} coinName={item.name} />
    </SwiperSlide>
  ));

  return (
    <div
      className={`${classes.trend} ${
        userTheme.theme === "dark" ? classes.dark : ""
      }`}
    >
      <div className={classes.trendTitle}>
        <TrendingUpIcon />
        <h3>Trending Coins</h3>
        <WhatshotIcon />
      </div>
      {isLoading && (
        <Skeleton variant="rectangular" width={`100%`} height={300} />
      )}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          loop={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {sliderItems}
        </Swiper>
      )}
    </div>
  );
};

export default TrendCoins;
