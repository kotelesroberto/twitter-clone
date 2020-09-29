import React, { useState } from "react";
import "./Login.scss";

import TwitterIcon from "@material-ui/icons/Twitter";
import Button from "@material-ui/core/Button";

// React Router
import { Link, NavLink, useHistory } from "react-router-dom";

// React Context
import { useStateValue } from "../../StateProvider";

import { auth } from "../../firebase/firebase";

const Login = () => {
  // context data
  const [{ user, loginScreenType }, dispatch] = useStateValue();

  const [username, setUsername] = useState("test123@test.com");
  const [password, setPassword] = useState("Test123!");
  const [error, setError] = useState("");

  const history = useHistory(); // it allows us to programmatically change the url (after login for example)

  const doLogin = (e) => {
    e.preventDefault();

    // some fancy firebase login stuff
    auth
      .signInWithEmailAndPassword(username, password)
      .then((auth) => {
        // it successfully logged in with email and password
        console.log(auth);
        if (auth) {
          history.push("/home"); // redirect to homepage
        }
      })
      .catch((error) => alert(error.message));

    // dispatch({
    //   type: "SET_USER",
    //   user: {
    //     id: "44567889898",
    //     displayName: "Jimi Hendrix",
    //     occupation: "Musician",
    //     username: "JimiHendrix",
    //     verified: true,
    //     avatar: "https://m.media-amazon.com/images/I/51qyXfsyjRL._AA256_.jpg",
    //   },
    // });

    // dispatch({
    //   type: "SET_LOGINSCREEN",
    //   loginScreenType: "landing",
    // });

    // history.replace("/home");
  };

  const handleForgotPassword = (e) => {};

  const handleSignup = (e) => {
    e.preventDefault();
    // do some fancy Firebase register stuff
    auth
      .createUserWithEmailAndPassword(username, password)
      .then((auth) => {
        setError("");

        // it successfully created a new user with email and password
        console.log(auth);
        if (auth) {
          history.push("/"); // redirect to homepage
        }
      })
      .catch((error) => {
        // Handle Errors here.
        if (error.code === "auth/weak-password") {
          // alert("The password is too weak.");
          setError("The password is too weak.");
        } else {
          setError(error.message);
        }
        console.log(error);
      });
  };

  return (
    <div className="login">
      <NavLink to="/" activeClassName="active">
        <TwitterIcon className="login__twitterIcon" />
      </NavLink>

      <h2>Log in to Twitter</h2>

      {error && <p className="login__error">{error}</p>}

      <form action="">
        <label htmlFor="username" className="login__label">
          Phone, email, or username ()
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
