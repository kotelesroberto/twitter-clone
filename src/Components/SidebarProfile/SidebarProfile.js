import React, { useState } from "react";
import "./SidebarProfile.scss";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar, Button } from "@material-ui/core";

import SidebarProfileDialog from "./SidebarProfileDialog";

// React Context
import { useStateValue } from "../../StateProvider";

const SidebarProfile = () => {
  // context data
  const [{ user }, dispatch] = useStateValue();

  const [dialog, setDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  return (
    <div
      className="sidebarProfile"
      onClick={(e) => {
        setAnchorEl(e.currentTarget);
        setDialog(!dialog);
      }}
    >
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

      <ExpandMoreIcon className="sidebarProfile__dropDown" />

      <SidebarProfileDialog
        dialog={dialog}
        setDialog={setDialog}
        anchorEl={anchorEl}
      />
    </div>
  );
};

export default SidebarProfile;