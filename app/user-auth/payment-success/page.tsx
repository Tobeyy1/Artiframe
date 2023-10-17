"use client";

import React, { useState, useEffect } from "react";
import classes from "./paymentsuccess.module.scss";
import { LuCheckCircle } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import { successPage } from "@/app/assets/SVGs";
import Transition from "@/app/components/Transition/Transition";
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
  const [showTransition, setShowTransition] = useState<boolean>(false);
  const router = useRouter();

  const previousURL = document.referrer;
  console.log("Previous URL: ", previousURL);
  useEffect(() => {}, []);

  const onAnimationComplete = () => {
    router.push("/system");
  };

  return (
    <>
      {showTransition && (
        <Transition mode={"outro"} onComplete={onAnimationComplete} />
      )}
      <div className={classes.container}>
        <h1>Payment Received!</h1>
        <h1>{previousURL} </h1>
        <div className={classes.image__container}>
          <Image
            src={successPage}
            fill
            alt={"subscribe"}
            className={classes.image}
          />
        </div>
        <section className={classes.content}>
          <p>You now have access to ArtiFrame</p>
          <button
            type="button"
            title="Enter"
            onClick={() => {
              setShowTransition(true);
            }}
          >
            Dive In!
          </button>
        </section>
      </div>
    </>
  );
};

export default PaymentSuccess;
