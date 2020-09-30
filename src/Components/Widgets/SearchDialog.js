import React from "react";
import "./SearchDialog.scss";

import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

// React Context
import { useStateValue } from "../../StateProvider";

const SearchDialog = ({ dialog, setDialog, anchorEl, setAnchorEl }) => {
  // context data
  const [{ user }, dispatch] = useStateValue();

  const handleClose = () => {
    setAnchorEl(null);
    setDialog(!dialog);
  };

  return (
    <Popover
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={dialog}
      anchorEl={anchorEl}
      className="SearchDialog"
      onClose={handleClose}
    >
      <List>
        <ListItem autoFocus button>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Jeff Bezos" />
        </ListItem>
      </List>
    </Popover>
  );
};

export default SearchDialog;
