import React, { useState } from "react";
import "./ProfileEdit.scss";

import { Avatar, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

// firebase
import { db, auth } from "../../firebase/firebase";

// React Context
import { useStateValue } from "../../StateProvider";

const ProfileEdit = ({ editOpen, setEditOpen }) => {
  // context data
  const [{ user }, dispatch] = useStateValue();

  const [name, setName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);
  const [website, setWebsite] = useState(user.website);
  const [birthday, setBirthday] = useState(user.birthday);

  const saveProfile = () => {
    const userFirebase = auth.currentUser;
    const newPhotoURL =
      "https://images-na.ssl-images-amazon.com/images/I/71%2BwSVmufAL._AC_SL1200_.jpg";
    const newTeaserImage =
      "https://i.cbc.ca/1.5245615.1565722610!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/woodstock.jpg";

    // save extra data into Firebase database
    db.collection("users")
      .doc(userFirebase.uid)
      .update({
        displayName: name,
        photoURL: newPhotoURL,
        teaserImage: newTeaserImage,
        bio: bio,
        location: location,
        website: website,
        birthday: birthday,
      })
      .then(() => {
        console.log("Document successfully written!");

        let tempUser = { ...user };
        tempUser.displayName = name;
        tempUser.photoURL = newPhotoURL;
        tempUser.website = website;
        tempUser.birthday = birthday;

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

  return (
    <Dialog
      open={editOpen}
      //   onClose={() => {setEditOpen()}
      aria-labelledby="form-dialog-title"
      className="profileEdit"
    >
      <DialogActions>
        <IconButton className="profileEdit__close">
          <CloseIcon
            fontSize="medium"
            onClick={() => {
              setEditOpen(false);
            }}
          ></CloseIcon>
        </IconButton>
        <DialogTitle id="form-dialog-title">Edit profile</DialogTitle>
        <Button
          onClick={saveProfile}
          color="primary"
          className="profileEdit__save button"
        >
          Save
        </Button>
      </DialogActions>

      {/* Teaser photo */}
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
      <DialogContent>
        <InputLabel htmlFor="name" className="profileEdit__label">
          Name
        </InputLabel>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label=""
          placeholder="Add your name"
          type="text"
          fullWidth
          value={name}
        />
      </DialogContent>
      <DialogContent>
        <InputLabel htmlFor="bio" className="profileEdit__label">
          Bio
        </InputLabel>
        <TextareaAutosize
          rowsMax={4}
          autoFocus
          margin="dense"
          id="bio"
          label=""
          placeholder="Add your bio"
          type="text"
          fullWidth
          className="profileEdit__textarea"
          value={bio}
        />
      </DialogContent>
      <DialogContent>
        <InputLabel htmlFor="location" className="profileEdit__label">
          Location
        </InputLabel>
        <TextField
          autoFocus
          margin="dense"
          id="location"
          label=""
          placeholder="Add your location"
          type="text"
          fullWidth
          value={location}
        />
      </DialogContent>
      <DialogContent>
        <InputLabel htmlFor="website" className="profileEdit__label">
          Website
        </InputLabel>
        <TextField
          autoFocus
          margin="dense"
          id="website"
          label=""
          placeholder="Add your website"
          type="text"
          fullWidth
          value={website}
        />
      </DialogContent>
      <DialogContent>
        <InputLabel htmlFor="birthday" className="profileEdit__label">
          Birthday
        </InputLabel>
        <TextField
          autoFocus
          margin="dense"
          id="birthday"
          label=""
          placeholder="Add your birthday"
          type="text"
          fullWidth
          value={birthday}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEdit;
