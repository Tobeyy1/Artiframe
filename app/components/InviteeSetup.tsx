"use client";

import React, { useState } from "react";
import classes from "./InviteeSetup.module.scss";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosCheckmark,
} from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  namesOfInvitees: string[];
  setNamesOfInvitees: (value: string[]) => void;
  setIsSetupCompleted: (value: boolean) => void;
  setShowInviteSetup: (value: boolean) => void;
}

const InviteeSetup: React.FC<Props> = ({
  namesOfInvitees,
  setNamesOfInvitees,
  setIsSetupCompleted,
  setShowInviteSetup,
}) => {
  const [numberOfInvites, setNumberOfInvites] = useState<number>(0);
  const [isDisplayNamesActive, setIsDisplayNamesActive] =
    useState<boolean>(false);

  const backHandler = () => {
    setNumberOfInvites(0);
    setIsDisplayNamesActive(false);
    setNamesOfInvitees([]);
  };

  const handleConfirm = () => {
    setIsSetupCompleted(true);
  };

  const variants = {
    initial: {
      backgroundColor: "transparent",
    },
    animate: {
      backgroundColor: "transparent",
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    whileHover: { opacity: 0.5 },
  };

  return (
    <motion.div className={classes.container}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={classes.backdrop}
        onClick={() => setShowInviteSetup(false)}
      ></motion.div>
      <AnimatePresence mode="wait">
        {!isDisplayNamesActive ? (
          <motion.form
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            key={"Number of Invitees Modal"}
            className={classes.number__of__invites__modal}
          >
            <label htmlFor="Number of Invitees" className={classes.label}>
              <p>How many people will be invited?</p>
              <input
                type="number"
                name="Number of Invitees"
                id={classes.number__of__invitees}
                onChange={(event) => setNumberOfInvites(+event.target.value)}
              />
            </label>
            <button
              type="button"
              onClick={() => {
                if (numberOfInvites > 0) setIsDisplayNamesActive(true);
              }}
            >
              Next <IoIosArrowForward />
            </button>
          </motion.form>
        ) : (
          <motion.form
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            key={"Names of Invitees Modal"}
            className={classes.names__of__invitees}
          >
            <h3>Input the name(s) of the Invitees</h3>

            <motion.ul variants={variants} initial="initial" animate="animate">
              {Array(numberOfInvites)
                .fill("invitee")
                .map((_, index: number) => {
                  return (
                    <motion.li variants={item} key={index}>
                      <label
                        htmlFor={`Invitee${index + 1}`}
                        className={classes.invitee__label}
                      >
                        <p>{index + 1}</p>
                        <input
                          type="text"
                          name={`Invitee${index + 1}`}
                          className={classes.invitee__input}
                          onChange={(e) =>
                            (namesOfInvitees[index] = e.target.value)
                          }
                        />
                      </label>
                    </motion.li>
                  );
                })}
            </motion.ul>
            <div className={classes.cta__container}>
              <button
                type="button"
                className={classes.back}
                onClick={backHandler}
              >
                <IoIosArrowBack /> Back
              </button>
              <button
                type="button"
                className={classes.confirm}
                onClick={handleConfirm}
              >
                Confirm
                <IoIosCheckmark />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InviteeSetup;
