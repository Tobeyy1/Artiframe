"use client";

import React, { useState, useEffect } from "react";
import classes from "./paymentsuccess.module.scss";
import Image from "next/image";
import { successPage } from "@/app/assets/SVGs";
import Transition from "@/app/components/Transition/Transition";
import { useRouter } from "next/navigation";
import { TbLockSquareRounded } from "react-icons/tb";
import { motion } from "framer-motion";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import { useSession } from "next-auth/react";

const PaymentSuccess = () => {
  const [showTransition, setShowTransition] = useState<boolean>(false);
  const [previousURL, setPreviousURL] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const previousURI = document.referrer;
    // const previousURI = "https://paystack.com";
    setPreviousURL(previousURI);

    if (!previousURI.includes("https://paystack.com")) {
      setTimeout(() => {
        router.replace("/user-auth/subscription");
      }, 3000);
    }
  }, [router]);

  const onAnimationComplete = () => {
    router.push("/system");
  };

  const subscriptionHandler = async () => {
    setIsLoading(true);

    const subscriptionType = sessionStorage.getItem("subscription");

    if (!subscriptionType) return;

    const response = await fetch("/api/subscription", {
      method: "POST",
      body: JSON.stringify({
        subscription: subscriptionType,
        email: session?.user.email,
      }),
    });
    // const data = response;
    const data = await response.json();

    if (data.status !== 201) {
      console.log(data);
      setIsLoading(false);
      return;
    }

    setShowTransition(true);
  };

  if (!previousURL.includes("https://paystack.com")) {
    return (
      <div className={classes.modal__container}>
        <div className={classes.modal}>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={classes.modal__icon}
          >
            <TbLockSquareRounded />
          </motion.span>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.3,
            }}
          >
            You don&apos;t have access to this page because your payment was not
            processed
          </motion.p>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.4,
            }}
          >
            Redirecting...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <>
      {showTransition && (
        <Transition mode={"outro"} onComplete={onAnimationComplete} />
      )}
      {isLoading && <LoadingSpinner />}
      <div className={classes.container}>
        <h1>Payment Received!</h1>
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
              subscriptionHandler();
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
