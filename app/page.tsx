"use client";

import { useRef } from "react";
import classes from "./page.module.scss";
import Welcome from "./components/Welcome";
import UI from "./components/UI";

export default function Home() {
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const movetoUI = () => {
    if (mainContainerRef.current) {
      mainContainerRef.current.style.left = "-100dvw";
    }
  };

  return (
    <main className={classes.container} ref={mainContainerRef}>
      <Welcome onMove={movetoUI} />
      <UI />
    </main>
  );
}
