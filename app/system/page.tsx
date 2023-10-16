"use client";

import React, { useEffect, useState } from "react";
import classes from "./UI.module.scss";
import Typewriter from "typewriter-effect";
import ImageUploader from "../components/ImageUploader";
import InviteeSetup from "../components/InviteeSetup";
import Transition from "../components/Transition/Transition";
import NavBar from "../components/NavBar/NavBar";
import { AnimatePresence } from "framer-motion";
import InfoModal from "../components/InfoModal/InfoModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type InfoModalType = {
  visible: boolean;
  mode: string;
  message: string;
};

const UI = () => {
  const [showTransition, setShowTransition] = useState(true);
  const [showInviteeSetup, setShowInviteeSetup] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [namesOfInvitees, setNamesOfInvitees] = useState<string[]>([]);
  const [currentInvitee, setCurrentInvitee] = useState<string | null>(
    "TOBEY THE DEVELOPER"
  );
  const [isSetupCompleted, setIsSetupCompleted] = useState<boolean>(false);
  const [infoModalDetails, setInfoModalDetails] = useState<InfoModalType>({
    visible: false,
    mode: "",
    message: "",
  });
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session && session?.user?.subscription === "free") {
      setInfoModalDetails({
        visible: true,
        mode: "ALERT",
        message: "Looks like you don't have an active subscription plan",
      });
    }
  }, [session]);

  const onAnimationComplete = () => {
    setShowTransition(false);
  };

  return (
    <div className={classes.container}>
      <NavBar />
      {showTransition && (
        <Transition mode={"intro"} onComplete={onAnimationComplete} />
      )}
      <AnimatePresence>
        {infoModalDetails.visible && (
          <InfoModal
            mode={infoModalDetails.mode}
            message={infoModalDetails.message}
            onClose={() => {
              setInfoModalDetails({
                visible: false,
                mode: "",
                message: "",
              });
              router.push("/user-auth/subscription");
            }}
          />
        )}
      </AnimatePresence>
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
