"use client";

import React, { useState, useRef, useEffect } from "react";
import classes from "./ImageUploader.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import StyledDropZone from "./StyledDropZone";
import Image from "next/image";
import html2canvas from "html2canvas";
import { FiDownload } from "react-icons/fi";

interface TextPosition {
  top: number;
  left: number;
}

interface TextWidth {
  isFocused: boolean;
  width: number;
}

interface ImageUploaderProps {
  onShow: (value: boolean) => void;
  // isSetupCompleted: (value: boolean) => void;
  isSetupCompleted: boolean;
  capturedImage: string | null;
  setCapturedImage: (value: string | null) => void;
  currentInvitee: string | null;
  namesOfInvitees: string[];
  setCurrentInvitee: (value: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onShow,
  capturedImage,
  setCapturedImage,
  currentInvitee,
  isSetupCompleted,
  setCurrentInvitee,
  namesOfInvitees,
}) => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [textColor, setTextColor] = useState<string>("#000");
  const [textSize, setTextSize] = useState<number>(30);
  const [textPosition, setTextPosition] = useState<TextPosition>({
    top: 50,
    left: 50,
  });
  const [textWidth, setTextWidth] = useState<TextWidth>({
    isFocused: true,
    width: 20,
  });
  const [startDownload, setStartDownload] = useState(false);
  const captureRef = useRef<HTMLImageElement | null>(null);

  const imageURLHandler = (imagePath: string) => {
    setImageURL(imagePath);
  };

  const inviteNameStyles = {
    color: textColor,
    fontSize: `${textSize}px`,
    top: `${textPosition.top}%`,
    left: `${textPosition.left}%`,
    width: `${textWidth.width}%`,
  };

  useEffect(() => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then((canvas) => {
        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL("image/png");

        // Set the captured image data URL in the state
        setCapturedImage(dataURL);
      });
    }
  }, [setCapturedImage]);

  useEffect(() => {
    const captureAndDownloadImage = async (invitee: string) => {
      if (captureRef.current) {
        const canvas = await html2canvas(captureRef.current);
        const dataURL = canvas.toDataURL("image/png");
        setCapturedImage(dataURL);

        if (dataURL) {
          const a = document.createElement("a");
          a.href = dataURL;
          a.download = `${invitee}_invite.png`;
          a.click();
          console.log("Downloading ", invitee);
        }
      }
    };

    if (startDownload && currentInvitee !== null) {
      captureAndDownloadImage(currentInvitee);

      // Find the index of the current invitee
      const currentIndex = namesOfInvitees.indexOf(currentInvitee);

      // If there are more invitees, set the next invitee as the currentInvitee
      if (currentIndex < namesOfInvitees.length - 1) {
        setCurrentInvitee(namesOfInvitees[currentIndex + 1]);
      } else {
        // All invitees have been processed, so reset the download process
        setStartDownload(false);
        setCurrentInvitee("TOBEY THE DEVELOPER");
      }
    }
  }, [startDownload, currentInvitee, namesOfInvitees]);

  const handleImageDownload = () => {
    // Start the download process by setting the first invitee
    setCurrentInvitee(namesOfInvitees[0]);
    setStartDownload(true);
  };

  return (
    <div className={classes.container}>
      <AnimatePresence>
        {!imageURL && (
          <motion.section
            // initial={{ width: "50%" }}
            // animate={{ width: "50%" }}
            // exit={{ width: "0%" }}
            className={classes.text__content}
          >
            <div>
              <motion.span>Upload</motion.span>
            </div>
            <div>
              <motion.span>Your</motion.span>
            </div>
            <div>
              <motion.span>Image</motion.span>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      <section className={classes.upload__image}>
        {!imageURL && <StyledDropZone onImageDrop={imageURLHandler} />}
        {imageURL && (
          <div className={classes.image__container} ref={captureRef}>
            <span
              className={`${classes.invite__name} ${
                textWidth.isFocused ? classes.editing__invite__name : ""
              }`}
              style={inviteNameStyles}
            >
              {currentInvitee}
            </span>{" "}
            <Image
              ref={captureRef}
              src={imageURL}
              alt="Invite Image"
              fill
              className={classes.image}
            />
          </div>
        )}
      </section>
      {imageURL && !isSetupCompleted && (
        <section className={classes.text__placement__form__container}>
          <h2>Text Settings</h2>
          <form>
            <label htmlFor="textColor">
              <span>Text Color :</span>
              <input
                type="color"
                name="textColor"
                id={classes.text__color__input}
                onChange={(event: any) => setTextColor(event.target.value)}
              />
            </label>

            <label htmlFor="textSize">
              <span>Text Size :</span>
              <input
                type="number"
                name="textSize"
                className={classes.input}
                onChange={(event: any) => setTextSize(+event.target.value)}
                placeholder="30px"
              />
            </label>

            <label htmlFor="textWidth">
              <span>Text Width :</span>
              <input
                type="number"
                name="textWidth"
                className={classes.input}
                onChange={(event: any) => {
                  setTextWidth((prevState) => ({
                    ...prevState,
                    width: +event.target.value,
                  }));
                }}
                onFocus={() => {
                  setTextWidth((prevState) => ({
                    ...prevState,
                    isFocused: true,
                  }));
                }}
                onBlur={() => {
                  setTextWidth((prevState) => ({
                    ...prevState,
                    isFocused: false,
                  }));
                }}
                placeholder="20%"
              />
            </label>

            <div className={classes.text__position}>
              <h3>Text Position</h3>
              <label htmlFor="vertical" className={classes.position__label}>
                <span>Vertical :</span>
                <input
                  type="number"
                  name="vertical"
                  className={classes.input}
                  min={0}
                  max={100}
                  onChange={(event: any) => {
                    setTextPosition((prevState) => ({
                      ...prevState,
                      top: +event.target.value,
                    }));
                  }}
                  placeholder="50%"
                />
              </label>
              <label htmlFor="horizontal" className={classes.position__label}>
                <span>Horizontal :</span>
                <input
                  type="number"
                  name="horizontal"
                  className={classes.input}
                  min={0}
                  max={100}
                  onChange={(event: any) => {
                    setTextPosition((prevState) => ({
                      ...prevState,
                      left: +event.target.value,
                    }));
                  }}
                  placeholder="50%"
                />
              </label>
            </div>
            <button onClick={() => onShow(true)} type="button">
              SUBMIT
            </button>
          </form>
        </section>
      )}
      {isSetupCompleted && (
        <div className={classes.download__all__container}>
          <button type="button" onClick={handleImageDownload}>
            Download All
            <FiDownload />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
