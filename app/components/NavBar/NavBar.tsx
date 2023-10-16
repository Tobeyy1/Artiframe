"use client";

import React, { useState } from "react";
import classes from "./NavBar.module.scss";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";

const NavBar = () => {
  const [showNavBar, setShowNavBar] = useState<boolean>(false);

  const showNavBarHandler = () => {
    setShowNavBar(!showNavBar);
  };

  return (
    <nav
      className={classes.container}
      style={
        !showNavBar
          ? {
              right: "100%",
            }
          : { right: "calc(100% - 10rem)" }
      }
    >
      <span className={classes.menu__toggler} onClick={showNavBarHandler}>
        {showNavBar ? <AiOutlineClose /> : <AiOutlineMenuUnfold />}
      </span>
      <h1>MENU</h1>
      <ul>
        <li>
          <Link href="/user-auth/subscription">Subscribe</Link>
        </li>
        <li
          id={classes.logout}
          onClick={() => {
            signOut();
          }}
        >
          Log Out
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
