import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { UserThemeContext } from "../../store/ThemeContext";
import { useContext } from "react";

import classes from './searchBox.module.css'

const SearchBox = ({allData, onSearch}) => {
  const userTheme = useContext(UserThemeContext);

  const [search, setSearch] = useState('')

  const searchHandler = (e) => {
    setSearch(e.target.value)
  }
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      const newData = allData.filter(coin => coin.id.toLowerCase().includes(search.toLowerCase()))
      onSearch(newData)
      }, 500)
    return (() => clearTimeout(searchTimeout))
  },[search,onSearch,allData])

  return (
    <div
    className={`${classes.search} ${
      userTheme.theme === "dark" ? classes.dark : ""
    }`}>
    <TextField color="primary" value={search} onChange={searchHandler} fullWidth placeholder="Search Between Coins" id="fullWidth" />
  </div>
  )
}

export default SearchBox