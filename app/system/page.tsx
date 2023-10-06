"use client";

import React, { useState } from "react";
import classes from "./UI.module.scss";
import Typewriter from "typewriter-effect";
import ImageUploader from "../components/ImageUploader";
import InviteeSetup from "../components/InviteeSetup";
import Transition from "../components/Transition/Transition";

const UI = () => {
  const [showTransition, setShowTransition] = useState(true);
  const [showInviteeSetup, setShowInviteeSetup] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [namesOfInvitees, setNamesOfInvitees] = useState<string[]>([]);
  const [currentInvitee, setCurrentInvitee] = useState<string | null>(
    "TOBEY THE DEVELOPER"
  );
  const [isSetupCompleted, setIsSetupCompleted] = useState<boolean>(false);

  const handleDownload = () => {
    if (capturedImage) {
      // Create a temporary anchor element to trigger the download
      const a = document.createElement("a");
      a.href = capturedImage;
      a.download = "captured_image.png";
      a.click();
    }
  };

  const onAnimationComplete = () => {
    setShowTransition(false);
  };

  return (
    <div className={classes.container}>
      {showTransition && (
        <Transition mode={"intro"} onComplete={onAnimationComplete} />
      )}
      {/* <Typewriter
        options={{
          cursor: " ",
        }}
        onInit={(typewriter) => {
          typewriter
            .pauseFor(150)
            .typeString("Artist.")
            .deleteChars(7)
            .typeString("Illustrator.")
            .start();
        }}
      /> */}
      <ImageUploader
        onShow={setShowInviteeSetup}
        capturedImage={capturedImage}
        setCapturedImage={setCapturedImage}
        currentInvitee={currentInvitee}
        isSetupCompleted={isSetupCompleted}
        namesOfInvitees={namesOfInvitees}
        setCurrentInvitee={setCurrentInvitee}
      />
      {showInviteeSetup && !isSetupCompleted && (
        <InviteeSetup
          namesOfInvitees={namesOfInvitees}
          setNamesOfInvitees={setNamesOfInvitees}
          setIsSetupCompleted={setIsSetupCompleted}
          setShowInviteSetup={setShowInviteeSetup}
        />
      )}
    </div>
  );
};

export default UI;