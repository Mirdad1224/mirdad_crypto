import React from 'react'
import NotFoundImage from '../Assets/images/404.jpg'

import classes from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={classes.notFound}>
        <img src={NotFoundImage} alt="" />
    </div>
  )
}

export default NotFound