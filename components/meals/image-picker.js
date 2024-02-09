"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const imagePickRef = useRef(null);

  const [pickedImage, setPickedImage] = useState();

  const handleImagePick = () => {
    imagePickRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>

      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage ? (
            <p>No image picked</p>
          ) : (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          ref={imagePickRef}
          className={classes.input}
          type="file"
          id={name}
          accept="image/png image/jpeg"
          name={name}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          onClick={handleImagePick}
          type="button"
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
