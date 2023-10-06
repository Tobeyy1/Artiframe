"use client";

import classes from "./register.module.scss";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
import Link from "next/link";
import Transition from "@/app/components/Transition/Transition";
import { useRouter } from "next/navigation";

const Register = () => {
  const [showTransition, setShowTransition] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const router = useRouter();

  const passwordVisibilityHandler = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onAnimationComplete = () => {
    router.push("/user-auth/subscription");
    // setShowTransition(false);
  };
  return (
    <>
      {showTransition && (
        <Transition mode={"outro"} onComplete={onAnimationComplete} />
      )}
      <div className={classes.container}>
        <header className={classes.header}>
          <h1>
            <button
              type="button"
              title="Go Back"
              onClick={() => {
                router.back();
              }}
            >
              <MdArrowBackIosNew />
            </button>
            Create an account
          </h1>
          <p className={classes.description}>Create unlimited invites</p>
          <p className={classes.register__link}>
            Already have an account?
            <Link href="/user-auth/login">Log In</Link>
          </p>
        </header>

        <form className={classes.form}>
          <input
            type="text"
            name="Email"
            placeholder="Email Address"
            id={classes.email__input}
          />
          <div className={classes.password__input__holder}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="Password"
              placeholder="Password"
              id={classes.password__input}
            />
            <span
              className={classes.password__view__icon}
              onClick={passwordVisibilityHandler}
            >
              {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </form>
        <button
          type="button"
          className={classes.register__cta}
          onClick={() => {
            setShowTransition(true);
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Register;
