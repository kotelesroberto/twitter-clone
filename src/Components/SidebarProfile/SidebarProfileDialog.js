import React from "react";
import "./SidebarProfileDialog.scss";

import SidebarProfileBadge from "./SidebarProfileBadge";

import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

// React Context
import { useStateValue } from "../../StateProvider";

import { auth } from "../../firebase/firebase";

const SidebarProfileDialog = ({ dialog, setDialog, anchorEl }) => {
  // context data
  const [{ user }, dispatch] = useStateValue();

  const handleClose = () => {
    if (user) {
      auth.signOut();
    }
    setDialog(false);
  };

  const handleListItemClick = (act) => {
    if (act === "logout") {
      if (user) {
        auth.signOut();
      }

      // dispatch({
      //   type: "SET_USER",
      //   user: null,
      // });
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
      <div className="sidebarProfileDialog__title">
        <SidebarProfileBadge user={user} icon="check" />
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
