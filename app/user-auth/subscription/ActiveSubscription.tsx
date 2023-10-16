import React from "react";
import classes from "./ActiveSubscription.module.scss";
import Link from "next/link";
import { GoAlertFill } from "react-icons/go";

const ActiveSubscription = () => {
  return (
    <div className={classes.container}>
      <div className={classes.modal}>
        <h1>
          <GoAlertFill /> Alert <GoAlertFill />{" "}
        </h1>
        <section>You have an active subscription plan!</section>
        <Link href={"/system"}>Go back</Link>
      </div>
    </div>
  );
};

export default ActiveSubscription;
