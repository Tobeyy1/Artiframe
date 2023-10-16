import React from "react";
import classes from "./InfoModal.module.scss";
import { GoAlertFill } from "react-icons/go";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";

interface Props {
  mode: string;
  message: string;
  onClose: () => void;
}

const InfoModal: React.FC<Props> = ({ mode, message, onClose }) => {
  return (
    <div className={classes.container}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className={classes.modal}
      >
        <h1>
          <GoAlertFill /> {mode} <GoAlertFill />{" "}
        </h1>
        <section>{message}</section>
        <button onClick={() => onClose()}>
          Close{" "}
          <span>
            <AiOutlineCloseCircle />
          </span>
        </button>
      </motion.div>
    </div>
  );
};

export default InfoModal;
