"use client";

import classes from "./login.module.scss";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";

import Link from "next/link";

import React, { useState } from "react";

const Login = () => {
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
          Login
        </h1>
        <p className={classes.description}>Log in to your Artiframe account</p>
        <p className={classes.register__link}>
          Don&apos;t have an account?
          <Link href="/user-auth/register">Create an account</Link>
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
      <button type="button" className={classes.login__cta}>
        Log In
      </button>
    </div>
  );
};

export default Login;
