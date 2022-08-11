import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import classes from "./aboutCoin.module.css";

const AboutCoin = ({ coinInfo }) => {
    const imageSource = coinInfo.image.large
    const name = coinInfo.name
    const rank = coinInfo.market_cap_rank
    const description = coinInfo.description.en.split(". ")[0] + "."
    
  return (
    <div>
      <div className={classes.info}>
        <img src={imageSource} alt="coin" />
        <h2>{name}</h2>
        <Stack direction="row" spacing={1}>
          <Chip label={`Rank ${rank}`} color="primary" />
          <Chip label="Coins" color="success" />
        </Stack>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default AboutCoin;
