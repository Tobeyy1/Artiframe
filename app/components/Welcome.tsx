"use client";

import React from "react";
import classes from "./Welcome.module.scss";
import { motion } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";

interface WelcomeProps {
  onMove: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onMove }) => {
  return (
    <header className={classes.container}>
      <h1>
        <p>Welcome To</p>
        <div>
          <motion.span>Artiframe</motion.span>
          <button type="button" title="Enter" onClick={onMove}>
            <span>Enter </span>
            <IoIosArrowRoundForward />
          </button>
        </div>
      </h1>
    </header>
  );
};

export default Welcome;
