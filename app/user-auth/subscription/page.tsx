"use client";

import React, { useEffect, useState } from "react";
import classes from "./subscription.module.scss";
import Image from "next/image";
import { subscriptionPage } from "@/app/assets/SVGs";
import { useRouter } from "next/navigation";
import ActiveSubscription from "./ActiveSubscription";
import { useSession } from "next-auth/react";

const Subscription = () => {
  const [selectedSubscription, setSelectedSubscription] =
    useState<string>("yearly");
  const [isSubscriptionActive, setIsSubscriptionActive] =
    useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.subscription !== "free") {
      setIsSubscriptionActive(true);
    }
  }, [session]);

  return (
    <div className={classes.container}>
      {isSubscriptionActive && <ActiveSubscription />}
      <section className={classes.text__content}>
        <h2>Subscribe!</h2>
        <h3>Achieve your goals!</h3>
        <div className={classes.image__container}>
          <Image
            src={subscriptionPage}
            fill
            alt={"subscribe"}
            className={classes.image}
          />
        </div>
      </section>
      <section className={classes.package__section}>
        <label className={classes.monthly__subscription}>
          <span>₦2000</span>
          <p>Billed monthly N2000</p>
          <input
            type="radio"
            checked={selectedSubscription === "monthly"}
            name="Monthly Subscription"
            className={classes.input}
            onClick={() => setSelectedSubscription("monthly")}
          />
        </label>
        <label className={classes.yearly__subscription}>
          <p>
            <span>₦18,000</span>
            ₦24,000
          </p>
          <p>Billed monthly ₦1500, ₦18,000/year</p>
          <input
            type="radio"
            checked={selectedSubscription === "yearly"}
            name="Yearly Subscription"
            className={classes.input}
            onClick={() => setSelectedSubscription("yearly")}
          />
        </label>
        <button
          type="button"
          onClick={() => {
            router.push("https://paystack.com/pay/artiframe-monthly");
          }}
        >
          PAY {selectedSubscription === "monthly" ? "₦2,000" : "₦18,000"}{" "}
        </button>
      </section>
    </div>
  );
};

export default Subscription;
