import React, { useState } from "react";
import "./FileUploadFireBase.scss";

import { db, auth, storage } from "../../firebase/firebase";

const FileUploadFireBase = () => {
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState({ imgUrl: "" });

  //   console.log(imageAsFile);
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    console.log("start of upload");

    // error handling
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }

    let newFileName =
      getFileName(imageAsFile.name) +
      "-" +
      safeFileName(25) +
      "." +
      getFileExtension(imageAsFile.name);
    // upload to Firebase
    const uploadImage = storage
      //   .ref(`/images/${imageAsFile.name}`)
      .ref(`/images/${newFileName}`)
      .put(imageAsFile);

    //initiates the firebase side uploading
    // get back the file (name and path) from firebase as an imageUrl
    uploadImage.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log("Upload snapshot", snapShot);
        console.log((snapShot.bytesTransferred / snapShot.totalBytes) * 100);

        // snapShot.totalBytes
        // snapShot.bytesTransferred
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(newFileName)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl({
              imgUrl: fireBaseUrl,
            });
          });
      }
    );
  };

  // randomize filename
  const getFileExtension = (filename) => {
    let exploded = filename.split(".");
    return exploded[exploded.length - 1];
  };
  const getFileName = (filename) => {
    let exploded = filename.split(".");
    exploded.pop();
    return exploded.join(".");
  };

  const safeFileName = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return (
    <div className="fileUploadFireBase">
      <form onSubmit={handleFireBaseUpload}>
        <input type="file" onChange={handleImageAsFile} />
        <button>upload to firebase</button>

        <img src={imageAsUrl.imgUrl} alt="" />
      </form>
    </div>
  );
};

export default FileUploadFireBase;
