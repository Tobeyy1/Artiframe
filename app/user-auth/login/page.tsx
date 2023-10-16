"use client";

import classes from "./login.module.scss";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";

import Link from "next/link";

import React, { FormEvent, useEffect, useState } from "react";
import Transition from "@/app/components/Transition/Transition";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import InfoModal from "@/app/components/InfoModal/InfoModal";
import { AnimatePresence } from "framer-motion";

type InfoModalType = {
  visible: boolean;
  mode: string;
  message: string;
};

const Login = () => {
  const [showTransition, setShowTransition] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [infoModalDetails, setInfoModalDetails] = useState<InfoModalType>({
    visible: false,
    mode: "",
    message: "",
  });

  const router = useRouter();
  const { data: session, status } = useSession();

  const passwordVisibilityHandler = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onAnimationComplete = () => {
    router.replace("/system");
    // setShowTransition(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    console.log({ response });
    if (!response?.error) {
      setShowTransition(true);
      return;
    }

    setIsLoading(false);
    setInfoModalDetails({
      visible: true,
      mode: "ERROR",
      message: response?.error,
    });
  };

  useEffect(() => {
    if (session) {
      setShowTransition(true);
      console.log(session);
    }
  }, [session, status]);

  return (
    <>
      {showTransition && (
        <Transition mode={"outro"} onComplete={onAnimationComplete} />
      )}
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
            Login
          </h1>
          <p className={classes.description}>
            Log in to your Artiframe account
          </p>
          <p className={classes.register__link}>
            Don&apos;t have an account?
            <Link href="/user-auth/register">Create an account</Link>
          </p>
        </header>

        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            type="text"
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
            className={classes.login__cta}
            onClick={() => {}}
          >
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
