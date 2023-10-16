import React from "react";
import classes from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={classes.container}>
      <div className={classes.loader}></div>
    </div>
  );
};

export default LoadingSpinner;
