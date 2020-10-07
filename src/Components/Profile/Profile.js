import React, { useEffect, useState } from "react";
import "./Profile.scss";

// custom components
import ProfileTabEntry from "./ProfileTabEntry";
import ProfileEdit from "./ProfileEdit";

// icons
import { Avatar, Button } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// time management
import Moment from "react-moment";
import "moment-timezone";

// import DataTweets from "./data/DataTweets.json";
// import DataTweetsReplies from "./data/DataTweetsReplies.json";

// firebase
import { db, auth } from "../../firebase/firebase";

// React Context
import { useStateValue } from "../../StateProvider";

// React Router
import { NavLink } from "react-router-dom";

const Profile = () => {
  // context data
  const [{ user }, dispatch] = useStateValue();

  const [tab01Content, setTab01Content] = useState([]);
  const [tab02Content, setTab02Content] = useState([]);

  // fetch tab data
  useEffect(() => {
    const fecthData = async (filename, tab) => {
      fetch(filename)
        .then((response) => response.json())
        .then((data) => {
          console.log("data is:", data);
          if (tab === "tab1") {
            setTab01Content(data);
          } else if (tab === "tab2") {
            setTab02Content(data);
          }
        });
    };

    fecthData("./data/DataTweets.json", "tab1");
    fecthData("./data/DataTweetsReplies.json", "tab2");
  }, []);

  // edit profile
  const [editOpen, setEditOpen] = useState(false);
  const openEditDialog = (e) => {
    e.preventDefault();
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };

  // tabs
  const [tab, setTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const saveNewPassword = () => {
    const user = auth.currentUser;
    let credential;
    // Prompt the user to re-provide their sign-in credentials

    user
      .reauthenticateWithCredential(credential)
      .then(function () {
        // User re-authenticated.
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  return (
    <div className="profile">
      <div
        className="profile__teaser"
        style={{ backgroundImage: `url(${user.teaserImage})` }}
      >
        {/* Teaser image comes here */}
      </div>

      <div className="profile__header">
        <div className="profile__strip">
          <Avatar
            className="profile__avatar"
            alt={user.username}
            src={
              user.photoURL
                ? user.photoURL
                : "./assets/default_profile_400x400.png"
            }
          />

          <Button
            type="button"
            variant="outlined"
            className="profile__button button button--outline"
            onClick={openEditDialog}
          >
            Edit profile
          </Button>

          <ProfileEdit editOpen={editOpen} setEditOpen={setEditOpen} />
        </div>
        <h3>
          {user.displayName} <span>@{user.username}</span>
        </h3>

        {user.bio && <p>{user.bio}</p>}

        <div className="profile__info">
          <p>
            <LocationOnIcon fontSize="small" className="profile__icon" />{" "}
            {user.location}
            <DateRangeIcon fontSize="small" className="profile__icon" />{" "}
            Joined&nbsp;
            {<Moment format="MMMM YYYY">{user.metadata.creationTime}</Moment>}
          </p>

          <p>
            <span> 1</span> Following <span>0</span> Followers
          </p>
        </div>
      </div>

      <div className="profile__body">
        <Tabs
          value={tab}
          onChange={handleTabChange}
          aria-label="Profile activities"
          className="profile__tabs"
          variant="fullWidth"
          //   variant="scrollable"
          scrollButtons="on"
          //   indicatorColor="primary"
          //   textColor="primary"
        >
          <Tab label="Tweets" />
          <Tab label="Tweets & replies" />
          <Tab label="Media" />
          <Tab label="Likes" />
        </Tabs>

        <TabPanel value={tab} index={0} className="profile__tabContent">
          <h3 className="profile__tabContenttitle">Who to follow</h3>
          {tab01Content.map((item, index) => (
            <ProfileTabEntry
              key={index}
              avatar={item.avatar}
              displayName={item.displayName}
              username={item.username}
              text={item.text}
              verified={item.verified}
            />
          ))}
        </TabPanel>
        <TabPanel value={tab} index={1} className="profile__tabContent">
          <h3 className="profile__tabContenttitle">Who to follow</h3>
          {tab02Content.map((item, index) => (
            <ProfileTabEntry
              key={index}
              avatar={item.avatar}
              displayName={item.displayName}
              username={item.username}
              text={item.text}
              verified={item.verified}
            />
          ))}
        </TabPanel>
        <TabPanel value={tab} index={2} className="profile__tabContent">
          <div className="profile__tabContentBody">
            <h3>You haven’t Tweeted any photos or videos yet</h3>
            <p>
              When you send Tweets with photos or videos in them, it will show
              up here.
            </p>

            <NavLink to="/home" activeClassName="active">
              <Button type="button" variant="outlined" className="button">
                Tweet a photo or video
              </Button>
            </NavLink>
          </div>
        </TabPanel>
        <TabPanel value={tab} index={3} className="profile__tabContent">
          <div className="profile__tabContentBody">
            <h3>You don’t have any likes yet</h3>
            <p>
              Tap the heart on any Tweet to show it some love. When you do,
              it’ll show up here.
            </p>
          </div>
        </TabPanel>
      </div>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div p={3}>{children}</div>}
    </div>
  );
};

export default Profile;
