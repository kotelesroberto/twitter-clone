import React, { useEffect, useState } from "react";
import "./PopupMenu.scss";

import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import RepeatIcon from "@material-ui/icons/Repeat";
import CreateIcon from "@material-ui/icons/Create";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import LinkIcon from "@material-ui/icons/Link";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import CodeIcon from "@material-ui/icons/Code";
import BlockIcon from "@material-ui/icons/Block";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const PopupMenu = ({ dialog, setDialog, anchorEl, setAnchorEl, menuitems }) => {
  const handleClose = () => {
    setAnchorEl(null);
    setDialog(!dialog);
  };

  const [icon, setIcon] = useState(null);

  const doAction = () => {
    alert("demo");
  };

  const defineIcon = (icon) => {
    let iconSvg;

    switch (icon) {
      case "RepeatIcon":
        iconSvg = <RepeatIcon />;
        break;
      case "CreateIcon":
        iconSvg = <CreateIcon />;
        break;
      case "MailOutlineIcon":
        iconSvg = <MailOutlineIcon />;
        break;
      case "BookmarkBorderIcon":
        iconSvg = <BookmarkBorderIcon />;
        break;
      case "LinkIcon":
        iconSvg = <LinkIcon />;
        break;
      case "EmojiFlagsIcon":
        iconSvg = <EmojiFlagsIcon />;
        break;
      case "CodeIcon":
        iconSvg = <CodeIcon />;
        break;
      case "BlockIcon":
        iconSvg = <BlockIcon />;
        break;
      case "VolumeOffIcon":
        iconSvg = <VolumeOffIcon />;
        break;
      case "PostAddIcon":
        iconSvg = <PostAddIcon />;
        break;
      case "PersonAddDisabledIcon":
        iconSvg = <PersonAddDisabledIcon />;
        break;
      case "SentimentVeryDissatisfiedIcon":
        iconSvg = <SentimentVeryDissatisfiedIcon />;
        break;
    }

    return iconSvg;
  };

  useEffect(() => {}, []);

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
      onClose={handleClose}
      anchorEl={anchorEl}
      className="popupMenu"
    >
      <List>
        {menuitems.map((item) => {
          const TagName = item.icon;
          console.log("TagName >>", TagName);
          return (
            <ListItem
              autoFocus
              button
              onClick={() => {
                doAction();
              }}
            >
              <ListItemAvatar>{defineIcon(TagName)}</ListItemAvatar>
              <ListItemText primary={item.text + " (demo)"} />
            </ListItem>
          );
        })}
      </List>
    </Popover>
  );
};

export default PopupMenu;
