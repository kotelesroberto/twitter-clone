import React, { useEffect, useState } from "react";
import "./ProfileEditImages.scss";

import { Avatar, Button } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";

// firebase
import { db, auth, storage } from "../../firebase/firebase";

// React Context
import { useStateValue } from "../../StateProvider";

const ProfileEditImages = () => {
  // context data
  const [{ user }, dispatch] = useStateValue();

  // header teaser
  const [teaserImageAsFile, setTeaserImageAsFile] = useState("");
  const [teaserImageAsUrl, setTeaserImageAsUrl] = useState({ imgUrl: "" });

  //   profile photo
  const [profileImageAsFile, setProfileImageAsFile] = useState("");
  const [profileImageAsUrl, setProfileImageAsUrl] = useState({ imgUrl: "" });

  //   set user image
  useEffect(() => {
    setProfileImageAsUrl({
      imgUrl: user.photoURL,
    });
  }, []);

  //   console.log(imageAsFile);
  const handleProfileImageAsFile = (e) => {
    const image = e.target.files[0];
    console.log(image);

    // set blob before upload
    setProfileImageAsUrl({
      imgUrl: URL.createObjectURL(image),
    });
    // setProfileImageAsFile((imageFile) => image);
    setProfileImageAsFile(image);
  };

  const handleFireBaseUpload01 = () => {
    console.log("start of upload");

    // error handling
    if (profileImageAsFile === "") {
      console.error(
        `not an image, the image file is a ${typeof profileImageAsFile}`
      );
      return;
    }

    let newFileName =
      getFileName(profileImageAsFile.name) +
      "-" +
      safeFileName(25) +
      "." +
      getFileExtension(profileImageAsFile.name);
    // upload to Firebase
    const uploadImage = storage
      //   .ref(`/images/${imageAsFile.name}`)
      .ref(`/images/${newFileName}`)
      .put(profileImageAsFile);

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
            setProfileImageAsUrl({
              imgUrl: fireBaseUrl,
            });
          });
      }
    );
  };

  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    console.log("start of upload");

    // error handling
    if (profileImageAsFile === "") {
      console.error(
        `not an image, the image file is a ${typeof profileImageAsFile}`
      );
      return;
    }

    let newFileName =
      getFileName(profileImageAsFile.name) +
      "-" +
      safeFileName(25) +
      "." +
      getFileExtension(profileImageAsFile.name);
    // upload to Firebase
    const uploadImage = storage
      //   .ref(`/images/${imageAsFile.name}`)
      .ref(`/images/${newFileName}`)
      .put(profileImageAsFile);

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
            setProfileImageAsUrl({
              imgUrl: fireBaseUrl,
            });
          });
      }
    );
  };

  /**************
  Filename magic 
  **************/
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
    <DialogContent>
      <div className="fileUploadFireBase">
        <form onSubmit={handleFireBaseUpload}>
          <input type="file" onChange={handleProfileImageAsFile} />
          <button>upload to firebase</button>

          {/* <img src={imageAsUrl.imgUrl} alt="" /> */}
        </form>
      </div>

      <div
        className="profile__teaser"
        style={{ backgroundImage: `url(${user.teaserImage})` }}
      >
        {/* Teaser image comes here */}
      </div>

      <div className="profile__header">
        <div className="profile__strip">
          <Avatar
            className="profile__avatar"
            alt={user.username}
            src={profileImageAsUrl.imgUrl}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default ProfileEditImages;
