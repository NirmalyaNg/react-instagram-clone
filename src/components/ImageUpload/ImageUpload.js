import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { storage, db } from "../../Firebase/firebase";
import "./ImageUpload.css";
import firebase from "firebase";

const ImageUpload = ({ username }) => {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    // Create a new folder names images in the firebase storage and put the image in that folder
    if (image) {
      if (
        image.type === "image/jpeg" ||
        image.type === "image/jpg" ||
        image.type === "image/png" ||
        image.type === "image/JPEG" ||
        image.type === "image/JPG" ||
        image.type === "image/PNG"
      ) {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          },
          (err) => {
            console.log(err);
            alert(err.message);
          },
          () => {
            // Complete function
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                // Post the url to the firestore
                db.collection("posts").add({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  caption: caption,
                  imageUrl: url,
                  username: username,
                });

                setProgress(0);
                setImage(null);
                setCaption("");
              });
          }
        );
      }
    } else {
      alert("Please choose an image..");
    }
  };

  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <input
        className="imageupload__input"
        type="text"
        placeholder="Enter a Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button
        variant="contained"
        onClick={handleUpload}
        color="primary"
        className="imageupload__button"
      >
        Upload
      </Button>
    </div>
  );
};

export default ImageUpload;
