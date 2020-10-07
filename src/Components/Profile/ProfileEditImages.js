import React, { useState } from "react";
import "./ProfileEditImages.scss";

import { Avatar, Button } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";

// firebase
import { db, auth } from "../../firebase/firebase";

// React Context
import { useStateValue } from "../../StateProvider";

const ProfileEditImages = () => {
  // context data
  const [{ user }, dispatch] = useStateValue();

  return (
    <DialogContent>
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
            src={
              user.photoURL
                ? user.photoURL
                : "./assets/default_profile_400x400.png"
            }
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default ProfileEditImages;
