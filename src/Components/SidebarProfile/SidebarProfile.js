import React, { useState } from "react";
import "./SidebarProfile.scss";

import SidebarProfileDialog from "./SidebarProfileDialog";

// React Context
import { useStateValue } from "../../StateProvider";

import SidebarProfileBadge from "./SidebarProfileBadge";

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
      <SidebarProfileBadge user={user} icon="expand" />

      <SidebarProfileDialog
        dialog={dialog}
        setDialog={setDialog}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </div>
  );
};

export default SidebarProfile;
