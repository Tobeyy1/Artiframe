import React, { useMemo, useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./StyledDropzone.module.scss";

interface StyledDropZoneProps {
  onImageDrop: (value: string) => void;
}

const baseStyle = {
  flex: 1,
  display: "grid",
  placeItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderColor: "#000",
  borderStyle: "dashed",
  borderRadius: "6px",
  backgroundColor: "transparent",
  color: "#000",
  height: "100%",
  outline: "none",
  cursor: "pointer",
  transition: "all .24s ease-in-out",
};

const focusedStyle = {
  color: "#56bdf5",
  borderColor: "#56bdf5",
};

const acceptStyle = {
  color: "#50d3b4",
  borderColor: "#50d3b4",
};

const rejectStyle = {
  color: "#b61515",
  borderColor: "#b61515",
};

const StyledDropZone: React.FC<StyledDropZoneProps> = ({ onImageDrop }) => {
  const [disabledInput, setDisabledInput] = useState(false);
  const fileRef = useRef();
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [] },
    disabled: disabledInput ? true : false,
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setDisabledInput(true);
      console.log("ACCEPTED FILES : ", URL.createObjectURL(acceptedFiles[0]));
      onImageDrop(URL.createObjectURL(acceptedFiles[0]));
    }
  }, [disabledInput, acceptedFiles, onImageDrop]);

  const files = acceptedFiles.map((file: any) => {
    return (
      <li key={file.path} className={classes.accepted__file}>
        <div className={classes.file__path}>
          <span className="material-symbols-rounded">description</span>
          <p>{file.path}</p>
        </div>
        <p className={classes.file__size}>{file.size} bytes</p>
      </li>
    );
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className={classes.container}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
        <em>(Only *.png and *.jpeg files will be accepted)</em>
      </div>
    </div>
  );
};

export default StyledDropZone;
