"use client";

import React from "react";
import classes from "./Transition.module.scss";
import { motion } from "framer-motion";

interface TransitionProps {
  mode: string;
  onComplete: () => void;
}

const Transition: React.FC<TransitionProps> = ({ mode, onComplete }) => {
  return (
    <motion.ul className={classes.container}>
      <motion.li
        initial={
          mode === "outro"
            ? {
                x: "100vw",
              }
            : { x: 0 }
        }
        animate={
          mode === "outro"
            ? {
                x: 0,
              }
            : { x: "100vw" }
        }
        exit={
          mode === "outro"
            ? {
                x: "100vw",
              }
            : { x: 0 }
        }
        transition={{
          duration: 0.25,
          delay: 0,
        }}
        className={classes.bar}
      ></motion.li>
      <motion.li
        initial={
          mode === "outro"
            ? {
                x: "100vw",
              }
            : { x: 0 }
        }
        animate={
          mode === "outro"
            ? {
                x: 0,
              }
            : { x: "100vw" }
        }
        exit={
          mode === "outro"
            ? {
                x: "100vw",
              }
            : { x: 0 }
        }
        transition={{
          duration: 0.25,
          delay: 0.1,
        }}
        className={classes.bar}
      ></motion.li>
      <motion.li
        initial={
          mode === "outro"
            ? {
                x: "100vw",
              }
            : { x: 0 }
        }
        animate={
          mode === "outro"
            ? {
                x: 0,
              }
            : { x: "100vw" }
        }
        exit={
          mode === "outro"
            ? {
                x: "100vw",
              }
            : { x: 0 }
        }
        transition={{
          duration: 0.25,
          delay: 0.2,
        }}
        className={classes.bar}
      ></motion.li>
      <motion.li
        initial={
          mode === "outro"
            ? {
                x: "100vw",
              }
            : { x: 0 }
        }
        animate={
          mode === "outro"
            ? {
                x: 0,
              }
            : { x: "100vw" }
        }
        exit={
          mode === "outro"
            ? {
                x: "100vw",
              }
            : { x: 0 }
        }
        transition={{
          duration: 0.25,
          delay: 0.3,
        }}
        className={classes.bar}
      ></motion.li>
      <motion.li
        initial={
          mode === "outro"
            ? {
                x: "100vw",
              }
            : { x: 0 }
        }
        animate={
          mode === "outro"
            ? {
                x: 0,
              }
            : { x: "100vw" }
        }
        exit={
          mode === "outro"
            ? {
                x: "100vw",
              }
            : { x: 0 }
        }
        transition={{
          duration: 0.25,
          delay: 0.4,
        }}
        className={classes.bar}
        onAnimationComplete={() => {
          onComplete();
        }}
      ></motion.li>
    </motion.ul>
  );
};

export default Transition;
