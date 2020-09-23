import React from "react";
import "./Sidebar.scss";

// React Router
import { Link, NavLink } from "react-router-dom";

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

        <NavLink to="/" activeClassName="active">
          <SidebarOption text="Home" Icon={HomeIcon} />
        </NavLink>

        {/* <SidebarOption text="Explore" Icon={SearchIcon} /> */}
        <NavLink to="/explore" activeClassName="active">
          <SidebarOption text="Explore" Character={"#"} />
        </NavLink>

        <NavLink to="/notifications" activeClassName="active">
          <SidebarOption
            key="Notifications"
            text="Notifications"
            Icon={NotificationsNoneIcon}
          />
        </NavLink>

        <NavLink to="/messages" activeClassName="active">
          <SidebarOption
            key="Messages"
            text="Messages"
            Icon={MailOutlineIcon}
          />
        </NavLink>

        <NavLink to="/bookmarks" activeClassName="active">
          <SidebarOption
            key="Bookmarks"
            text="Bookmarks"
            Icon={BookmarkBorderIcon}
          />
        </NavLink>

        <NavLink to="/lists" activeClassName="active">
          <SidebarOption key="Lists" text="Lists" Icon={ListAltIcon} />
        </NavLink>

        <NavLink to="/profile" activeClassName="active">
          <SidebarOption key="Profile" text="Profile" Icon={PermIdentityIcon} />
        </NavLink>

        <NavLink to="/more" activeClassName="active">
          <SidebarOption key="More" text="More" Icon={MoreHorizIcon} />
        </NavLink>

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
