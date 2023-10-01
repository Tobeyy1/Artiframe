"use client";

import classes from "./register.module.scss";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
import Link from "next/link";

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const passwordVisibilityHandler = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h1>
          <button type="button" title="Go Back">
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
      <button type="button" className={classes.register__cta}>
        Submit
      </button>
    </div>
  );
};

export default Register;
