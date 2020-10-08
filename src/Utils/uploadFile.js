import { useState } from "react";
// firebase
import { db, auth, storage } from "../firebase/firebase";
import { useStateValue } from "../StateProvider";
import { getFileExtension, getFileName, safeFileName } from "./filename";

const uploadFile = async ({ folder = "images", imageAsFile, setUrl }) => {
  console.log("start of upload");

  // error handling
  if (imageAsFile === "") {
    console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    setUrl("");
    return;
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
    .ref(`/${folder}/${newFileName}`)
    .put(imageAsFile);

  //initiates the firebase side uploading
  // get back the file (name and path) from firebase as an imageUrl
  uploadImage.on(
    "state_changed",
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log("Upload snapshot", snapShot);
      console.log((snapShot.bytesTransferred / snapShot.totalBytes) * 100);
    },
    (err) => {
      //catches the errors
      console.log(err);
    },
    () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage
        .ref(folder)
        .child(newFileName)
        .getDownloadURL()
        .then((fireBaseUrl) => {
          console.log("changedddd");
          setUrl(fireBaseUrl);
        });
    }
  );
};

export { uploadFile };
