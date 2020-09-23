import React from "react";
import "./SidebarProfileDialog.scss";

import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";

import Popover from "@material-ui/core/Popover";

// import Dialog from "@material-ui/core/Dialog";
// import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";

// React Context
import { useStateValue } from "../../StateProvider";

const SidebarProfileDialog = ({ dialog, setDialog, anchorEl }) => {
  // context data
  const [{ user }, dispatch] = useStateValue();

  const handleClose = () => {
    setDialog(false);
  };

  const handleListItemClick = (act) => {
    if (act === "logout") {
      dispatch({
        type: "SET_USER",
        user: null,
      });
    } else if (act === "addAccount") {
      // TODO
    }
  };

  return (
    <Popover
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={dialog}
      anchorEl={anchorEl}
      className="sidebarProfileDialog"
    >
      <div className="title">
        <div className="sidebarProfile">
          <div className="sidebarProfile__avatar">
            <Avatar
              lassName="tweetBox__avatar"
              alt={user.displayName}
              src={user.avatar}
            />
          </div>

          <div className="sidebarProfile__body">
            <h3>
              {user.displayName}
              <span>@{user.username}</span>
            </h3>
          </div>

          <CheckIcon className="sidebarProfile__dropDown color-blue" />
        </div>
      </div>
      <List>
        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addAccount")}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add an existing account" />
        </ListItem>

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("logout")}
        >
          <ListItemText primary={`Log out @${user.username}`} />
        </ListItem>
      </List>
    </Popover>
  );
};

export default SidebarProfileDialog;
