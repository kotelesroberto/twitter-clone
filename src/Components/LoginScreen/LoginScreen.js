import React from "react";
import "./LoginScreen.scss";

import LoginScreenFooter from "./LoginScreenFooter";

import twitterBG from "./twitterBG.svg";

import SearchIcon from "@material-ui/icons/Search";
import GroupIcon from "@material-ui/icons/Group";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import TwitterIcon from "@material-ui/icons/Twitter";
import Button from "@material-ui/core/Button";

import { Link, useHistory } from "react-router-dom";

// React Context
import { useStateValue } from "../../StateProvider";

const LoginScreen = () => {
  // context data
  const [{ user, loginScreenType }, dispatch] = useStateValue();

  const history = useHistory(); // it allows us to programmatically change the url (after login for example)

  const doSignup = () => {};
  const doLogin = () => {
    // history.replace("/login");

    dispatch({
      type: "SET_LOGINSCREEN",
      loginScreenType: "panel",
    });
  };

  return (
    <div className="loginScreen">
      <div className="loginScreen__header">
        <div className="loginScreen__col loginScreen__left">
          <img src={twitterBG} alt="" className="loginScreen__leftBgImg" />
          <div className="loginScreen__intro">
            <div className="loginScreen__introItem">
              <SearchIcon
                fontSize="large"
                className="loginScreen__introItemIcon"
              />{" "}
              Follow your interest
            </div>
            <div className="loginScreen__introItem">
              <GroupIcon
                fontSize="large"
                className="loginScreen__introItemIcon"
              />{" "}
              Hear what people are talking about.
            </div>
            <div className="loginScreen__introItem">
              <ChatBubbleOutlineIcon
                fontSize="large"
                className="loginScreen__introItemIcon"
              />{" "}
              Join the conversation.
            </div>
          </div>
        </div>
        <div className="loginScreen__col loginScreen__right">
          <div className="loginScreen__loginPanel">
            <TwitterIcon fontSize="large" className="loginScreen__icon" />
            <h2>See what’s happening in the world right now</h2>

            <p>Join Twitter today.</p>

            <Button
              key="SignUpButton"
              variant="outlined"
              className="loginScreen__button"
              fullWidth
              onClick={doSignup}
            >
              Sign up
            </Button>

            <Button
              key="LogInButton"
              variant="outlined"
              className="loginScreen__button reverse"
              fullWidth
              onClick={doLogin}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>

      <LoginScreenFooter />
    </div>
  );
};

export default LoginScreen;
