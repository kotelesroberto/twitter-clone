import React from "react";
import "./SidebarProfile.scss";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar, Button } from "@material-ui/core";

// React Context
import { useStateValue } from "../../StateProvider";

const SidebarProfile = () => {
  // context data
  const [{ user }, dispatch] = useStateValue();

  return (
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

      <ExpandMoreIcon className="sidebarProfile__dropDown" />
    </div>
  );
};

export default SidebarProfile;
