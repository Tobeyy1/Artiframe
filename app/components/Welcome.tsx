"use client";

import React, { useState } from "react";
import classes from "./Welcome.module.scss";
import { motion } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRouter } from "next/navigation";

interface WelcomeProps {}

const Welcome: React.FC<WelcomeProps> = () => {
  const router = useRouter();
  return (
    <>
      <header className={classes.container}>
        <h1>
          <p>Welcome To</p>
          <div>
            <motion.span>Artiframe</motion.span>
            <button
              type="button"
              title="Enter"
              onClick={() => {
                router.push("/user-auth/login");
              }}
            >
              <span>Enter </span>
              <IoIosArrowRoundForward />
            </button>
          </div>
        </h1>
      </header>
    </>
  );
};

export default Welcome;
