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

  const [formInAction, setFormInAction] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const [location, setLocation] = useState(user.location ? user.location : "");
  const [website, setWebsite] = useState(user.website ? user.website : "");
  const [birthday, setBirthday] = useState(user.birthday ? user.birthday : "");

  const handleChange_Field = (id, value) => {
    switch (id) {
      case "name":
        setName(value);
        break;
      case "bio":
        setBio(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "website":
        setWebsite(value);
        break;
      case "birthday":
        setBirthday(value);
        break;
    }
    // console.log("id", id);
    console.log("val", value);
    // e.target.value;
  };

  const saveProfile = () => {
    setFormInAction(true);

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

        setFormInAction(false);
        setEditOpen(false);
      })
      .catch(function (error) {
        // An error happened.
        console.log("error >>>", error);
        setFormInAction(false);
      });
  };

  const addFocus = (e) => {
    // e.target.parentElement.parentElement.parentElement.classList.add("active");
    e.target.closest(".MuiDialogContent-root").classList.add("active");
  };

  const removeFocus = (e) => {
    // e.target.parentElement.parentElement.parentElement.classList.remove("active");
    e.target.closest(".MuiDialogContent-root").classList.remove("active");
  };

  return (
    <Dialog
      open={editOpen}
      //   onClose={() => {setEditOpen()}
      aria-labelledby="form-dialog-title"
      className="profileEdit"
    >
      <DialogActions>
        <IconButton
          className="profileEdit__close"
          onClick={() => {
            setEditOpen(false);
          }}
        >
          <CloseIcon fontSize="small"></CloseIcon>
        </IconButton>
        <DialogTitle id="form-dialog-title">Edit profile</DialogTitle>
        <Button
          onClick={saveProfile}
          color="primary"
          className="profileEdit__save button"
          disabled={formInAction}
        >
          {formInAction ? "In progress..." : "Save"}
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
      <DialogContent onClick={addFocus} onBlur={removeFocus}>
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
          onChange={(e) => {
            handleChange_Field(e.target.id, e.target.value);
          }}
        />
      </DialogContent>
      <DialogContent onClick={addFocus} onBlur={removeFocus}>
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
          // fullWidth
          className="profileEdit__textarea"
          value={bio}
          onChange={(e) => {
            handleChange_Field(e.target.id, e.target.value);
          }}
        />
      </DialogContent>
      <DialogContent onClick={addFocus} onBlur={removeFocus}>
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
          onChange={(e) => {
            handleChange_Field(e.target.id, e.target.value);
          }}
        />
      </DialogContent>
      <DialogContent onClick={addFocus} onBlur={removeFocus}>
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
          onChange={(e) => {
            handleChange_Field(e.target.id, e.target.value);
          }}
        />
      </DialogContent>
      <DialogContent onClick={addFocus} onBlur={removeFocus}>
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
          onChange={(e) => {
            handleChange_Field(e.target.id, e.target.value);
          }}
        />
      </DialogContent>

      {error && <span className="profileEdit__error">{error}</span>}
    </Dialog>
  );
};

export default ProfileEdit;
