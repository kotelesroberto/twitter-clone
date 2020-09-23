import React from "react";
import "./Sidebar.scss";

// ICONS
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
// import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Button from "@material-ui/core/Button";

// Components
import SidebarOption from "../SidebarOption/SidebarOption";
import SidebarProfile from "../SidebarProfile/SidebarProfile";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__nav">
        <TwitterIcon Icon={HomeIcon} className="sidebar__twitterIcon" />

        <SidebarOption active text="Home" Icon={HomeIcon} />
        {/* <SidebarOption text="Explore" Icon={SearchIcon} /> */}
        <SidebarOption text="Explore" Character={"#"} />

        <SidebarOption
          key="Notifications"
          text="Notifications"
          Icon={NotificationsNoneIcon}
        />
        <SidebarOption key="Messages" text="Messages" Icon={MailOutlineIcon} />
        <SidebarOption
          key="Bookmarks"
          text="Bookmarks"
          Icon={BookmarkBorderIcon}
        />
        <SidebarOption key="Lists" text="Lists" Icon={ListAltIcon} />
        <SidebarOption key="Profile" text="Profile" Icon={PermIdentityIcon} />
        <SidebarOption key="More" text="More" Icon={MoreHorizIcon} />

        {/* Button -> Tweet */}
        <Button
          key="TweetButton"
          variant="outlined"
          className="sidebar__tweetButton"
          fullWidth
        >
          Tweet
        </Button>
      </div>

      <SidebarProfile />
    </div>
  );
};

export default Sidebar;
