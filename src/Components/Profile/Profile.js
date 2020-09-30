import React from "react";
import "./Profile.scss";

// icons
import DateRangeIcon from "@material-ui/icons/DateRange";

import { Avatar, Button } from "@material-ui/core";

import { db, auth } from "../../firebase/firebase";

// React Context
import { useStateValue } from "../../StateProvider";

const Profile = () => {
  // context data
  const [{ user }, dispatch] = useStateValue();
  //   console.log("user >>>", user);

  const setupProfile = (e) => {
    e.preventDefault();
  };

  const saveProfile = () => {
    const userFirebase = auth.currentUser;
    const newDisplayName = "Jimi Hendrixxx";
    const newPhotoURL =
      "https://images-na.ssl-images-amazon.com/images/I/71%2BwSVmufAL._AC_SL1200_.jpg";

    // save extra data into Firebase database
    db.collection("users")
      .doc(userFirebase.uid)
      .update({
        displayName: newDisplayName,
        photoURL: newPhotoURL,
      })
      .then(() => {
        console.log("Document successfully written!");

        let tempUser = { ...user };
        tempUser.displayName = newDisplayName;
        tempUser.photoURL = newPhotoURL;

        console.log("tempUser >>>", tempUser);

        dispatch({
          type: "SET_USER",
          user: tempUser,
        });
      })
      .catch(function (error) {
        // An error happened.
        console.log("error >>>", error);
      });
  };

  const saveNewPassword = () => {
    const user = auth.currentUser;
    let credential;
    // Prompt the user to re-provide their sign-in credentials

    user
      .reauthenticateWithCredential(credential)
      .then(function () {
        // User re-authenticated.
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  return (
    <div className="profile">
      <div className="profile__teaser">
        <div className="profile__avatar">
          <Avatar
            className="tweetBox__avatar"
            alt={user.username}
            src={user.photoURL}
          />
        </div>
      </div>

      <div className="profile__header">
        <h3>{user.displayName}</h3>
        <span>@{user.username}</span>
        Joined September 2020 1 Following 0 Followers
        <Button
          type="button"
          variant="outlined"
          className="profile__button"
          onClick={saveProfile}
        >
          Set up profile
        </Button>
      </div>

      <div className="profile__body">
        <ul className="profile__wallHead">
          <li>Tweets</li>
          <li>Tweets & replies</li>
          <li>Media</li>
          <li>Likes</li>
        </ul>

        <ul className="profile__wallContent">
          <li>Tweets</li>
          <li>Tweets & replies</li>
          <li>Media</li>
          <li>Likes</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
