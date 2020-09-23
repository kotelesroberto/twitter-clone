import React, { useState } from "react";
import "./Login.scss";

import TwitterIcon from "@material-ui/icons/Twitter";
import Button from "@material-ui/core/Button";

// React Router
import { Link, NavLink, useHistory } from "react-router-dom";

// React Context
import { useStateValue } from "../../StateProvider";

const Login = () => {
  // context data
  const [{ user, loginScreenType }, dispatch] = useStateValue();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory(); // it allows us to programmatically change the url (after login for example)

  const doLogin = (e) => {
    e.preventDefault();

    dispatch({
      type: "SET_USER",
      user: {
        id: "44567889898",
        displayName: "Jimi Hendrix",
        occupation: "Musician",
        username: "JimiHendrix",
        verified: true,
        avatar: "https://m.media-amazon.com/images/I/51qyXfsyjRL._AA256_.jpg",
      },
    });

    dispatch({
      type: "SET_LOGINSCREEN",
      loginScreenType: "landing",
    });

    history.replace("/home");
  };

  const handleForgotPassword = (e) => {};
  const handleSignup = (e) => {};

  return (
    <div className="login">
      <NavLink to="/" activeClassName="active">
        <TwitterIcon className="login__twitterIcon" />
      </NavLink>

      <h2>Log in to Twitter</h2>

      <form action="">
        <label htmlFor="username" className="login__label">
          Phone, email, or username
        </label>
        <input
          className="login__input"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password" className="login__label">
          Password
        </label>
        <input
          className="login__input"
          name="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          key="TweetButton"
          variant="outlined"
          className="login__button"
          fullWidth
          onClick={doLogin}
        >
          DEMO Log in (just click)
        </Button>

        <ul className="login__footer">
          <li
            onClick={(e) => {
              handleForgotPassword(e);
            }}
          >
            Forgot password?
          </li>
          <li
            onClick={(e) => {
              handleSignup(e);
            }}
          >
            Sign up for Twitter
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Login;
