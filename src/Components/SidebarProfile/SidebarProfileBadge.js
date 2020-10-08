import React from "react";
import "./SidebarProfileBadge.scss";

import { Avatar, Button } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckIcon from "@material-ui/icons/Check";

const SidebarProfileBadge = ({ user, icon, extraClass }) => {
  let rightIcon;

  switch (icon) {
    case "expand":
      rightIcon = <ExpandMoreIcon className="sidebarProfileBadge__dropDown" />;
      break;
    case "check":
      rightIcon = (
        <CheckIcon className="sidebarProfileBadge__dropDown color-blue" />
      );
      break;

    default:
      break;
  }

  return (
    <div className="sidebarProfileBadge">
      <div className="sidebarProfileBadge__avatar">
        <Avatar
          className="sidebarProfileBadge__avatarAvatar"
          alt={user.displayName}
          src={user.photoURL}
        />
      </div>

      <div className={`sidebarProfileBadge__body ${extraClass}`}>
        <h3>
          {user.displayName}
          <span>@{user.username}</span>
        </h3>
      </div>

      {rightIcon}
    </div>
  );
};

export default SidebarProfileBadge;
