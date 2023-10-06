"use client";

import React, { useState } from "react";
import classes from "./Welcome.module.scss";
import { motion } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import Transition from "./Transition/Transition";

interface WelcomeProps {}

const Welcome: React.FC<WelcomeProps> = () => {
  const [showTransition, setShowTransition] = useState(false);
  const router = useRouter();
  const onAnimationComplete = () => {
    router.push("/user-auth/login");
    // setShowTransition(false);
  };
  return (
    <>
      {showTransition && (
        <Transition mode={"outro"} onComplete={onAnimationComplete} />
      )}
      <header className={classes.container}>
        <h1>
          <p>Welcome To</p>
          <div>
            <motion.span>Artiframe</motion.span>
            <button
              type="button"
              title="Enter"
              onClick={() => {
                setShowTransition(true);
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
