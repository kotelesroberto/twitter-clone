import React, { useEffect, useRef, useState } from "react";
import "./ProfileEditImages.scss";

import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Avatar } from "@material-ui/core";

const ProfileEditImages = ({
  variant,
  teaserImageAsFile,
  setTeaserImageAsFile,
  profileImageAsFile,
  setProfileImageAsFile,
  user,
}) => {
  const imageUploader = useRef(null);

  const [imageAsUrl, setImageAsUrl] = useState({ imgUrl: "" });

  let imageAsFile;
  let setImageAsFile;

  if (variant === "teaser") {
    imageAsFile = teaserImageAsFile;
    setImageAsFile = setTeaserImageAsFile;
  } else if (variant === "profile") {
    imageAsFile = profileImageAsFile;
    setImageAsFile = setProfileImageAsFile;
  }

  // set image src
  useEffect(() => {
    setImageAsUrl({
      imgUrl: variant === "profile" ? user.photoURL : user.teaserImage,
    });
  }, []);

  // console.log(imageAsFile)
  // handle file input change
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];

    // set blob before upload - display image locally
    setImageAsUrl({
      imgUrl: URL.createObjectURL(image),
    });
    setImageAsFile((imageFile) => image);

    resetImageUploader();
  };

  // reset file upload field
  const resetImageUploader = () => {
    imageUploader.current.value = null;
  };

  // handle form submit
  const handleForm = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {variant === "teaser" && (
        <div
          className="profile__teaser"
          style={{ backgroundImage: `url(${imageAsUrl.imgUrl})` }}
          onClick={() => imageUploader.current.click()}
        >
          {/* Teaser image comes here */}

          <form onSubmit={handleForm}>
            <input
              type="file"
              ref={imageUploader}
              onChange={handleImageAsFile}
              className="hidden"
            />
          </form>

          <PhotoCameraIcon className="profile__avatarPhotoIcon" />
        </div>
      )}

      {variant === "profile" && (
        <div className="profile__header">
          <div className="profile__strip">
            <PhotoCameraIcon
              className="profile__avatarPhotoIcon"
              onClick={() => imageUploader.current.click()}
            />
            <form onSubmit={handleForm}>
              <Avatar
                className="profile__avatar"
                alt={user.username}
                src={imageAsUrl.imgUrl}
                onClick={() => imageUploader.current.click()}
              />
              <input
                type="file"
                ref={imageUploader}
                onChange={handleImageAsFile}
                className="hidden"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileEditImages;
