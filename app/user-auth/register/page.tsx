"use client";

import classes from "./register.module.scss";
import React, { FormEvent, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
import Link from "next/link";
import Transition from "@/app/components/Transition/Transition";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import { AnimatePresence } from "framer-motion";
import InfoModal from "@/app/components/InfoModal/InfoModal";

type InfoModalType = {
  visible: boolean;
  mode: string;
  message: string;
};

const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [infoModalDetails, setInfoModalDetails] = useState<InfoModalType>({
    visible: false,
    mode: "",
    message: "",
  });

  const router = useRouter();

  const passwordVisibilityHandler = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const data = await response.json();

    if (data?.status === 201) {
      setIsLoading(false);
      setInfoModalDetails({
        visible: true,
        mode: "SUCCESS",
        message: data?.message,
      });
      setTimeout(() => {
        router.push("/user-auth/login");
      }, 2000);
      return;
    }

    setIsLoading(false);
    setInfoModalDetails({
      visible: true,
      mode: "ERROR",
      message: data?.message,
    });
  };
  return (
    <>
      <AnimatePresence>
        {infoModalDetails.visible && (
          <InfoModal
            mode={infoModalDetails.mode}
            message={infoModalDetails.message}
            onClose={() =>
              setInfoModalDetails({
                visible: false,
                mode: "",
                message: "",
              })
            }
          />
        )}
      </AnimatePresence>
      {isLoading && <LoadingSpinner />}
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

        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            id={classes.email__input}
          />
          <div className={classes.password__input__holder}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
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
          <button
            type="submit"
            className={classes.register__cta}
            onClick={() => {
              // setShowTransition(true);
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
