import React, { useState } from "react";
import "./Login.scss";

import TwitterIcon from "@material-ui/icons/Twitter";
import Button from "@material-ui/core/Button";

// React Router
import { Link, NavLink, useHistory } from "react-router-dom";

// React Context
import { useStateValue } from "../../StateProvider";

import { auth, db } from "../../firebase/firebase";

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
      .catch((error) => setError(error.message));

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

  const doSignup = (e) => {
    e.preventDefault();
    // do some fancy Firebase register stuff
    auth
      .createUserWithEmailAndPassword(username, password)
      .then((authResp) => {
        setError("");

        // it successfully created a new user with email and password
        console.log(authResp);
        if (authResp) {
          let userFirebase = auth.currentUser;
          console.log("userFirebase >>>", userFirebase);
          const newUsername = username.split("@")[0].replace(".", "_");

          // save extra data into Firebase database
          db.collection("users")
            .doc(userFirebase.uid)
            .set({
              displayName: newUsername,
              username: newUsername,
              bio: "",
              location: "",
              website: "",
              birthday: "",
            })
            .then(() => {
              console.log("Document successfully written!");
            });

          dispatch({
            type: "SET_LOGINSCREEN",
            loginScreenType: "landing",
          });

          history.push("/"); // redirect to homepage
        }
      })
      .catch((error) => {
        // Handle Errors here.
        if (error.code === "auth/weak-password") {
          setError("The password is too weak.");
        } else {
          setError(error.message);
        }
        console.log(error);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_LOGINSCREEN",
      loginScreenType: "signup",
    });
  };

  const getASecureRandomPassword = () => {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  };

  const handleForgotPassword = (e) => {
    var user = auth.currentUser;
    var newPassword = getASecureRandomPassword();

    // SIMPLE UPDATE PASSWORD
    // user
    //   .updatePassword(newPassword)
    //   .then(function () {
    //     // Update successful.
    //   })
    //   .catch(function (error) {
    //     // An error happened.
    //   });

    // SEND PASSWORD RESET EMAIL
    auth
      .sendPasswordResetEmail(username)
      .then(function () {
        // Email sent.
        setError(
          "Message sent with the new password. Please check your emails!"
        );
      })
      .catch(function (error) {
        // An error happened.
        setError(error.message);
      });
  };

  // const loginFacebook = (e) => {
  //   e.preventDefault();

  //   var provider = authFB;
  //   // You can add additional scopes to the provider:
  //   provider.addScope("email");
  //   provider.addScope("user_friends");

  //   auth
  //     .signInWithPopup(provider)
  //     .then(function (result) {
  //       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //       var token = result.credential.accessToken;
  //       // The signed-in user info.
  //       var user = result.user;
  //       // ...
  //     })
  //     .catch(function (error) {
  //       // Handle Errors here.
  //       // var errorCode = error.code;
  //       console.log(error);
  //       setError(error.message);
  //     });
  // };

  return (
    <div className="login">
      <NavLink to="/" activeClassName="active">
        <TwitterIcon className="login__twitterIcon" />
      </NavLink>

      <h2>{loginScreenType === "signup" ? "Sign up" : "Log in to"} Twitter</h2>

      {error && <p className="login__error">{error}</p>}

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

        {loginScreenType === "login" && (
          <Button
            key="TweetButton"
            variant="outlined"
            className="login__button"
            fullWidth
            onClick={doLogin}
          >
            Log in
          </Button>
        )}

        {loginScreenType === "signup" && (
          <Button
            key="TweetButton"
            variant="outlined"
            className="login__button"
            fullWidth
            onClick={doSignup}
          >
            Sign up
          </Button>
        )}

        {loginScreenType === "login" && (
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
        )}
      </form>
    </div>
  );
};

export default Login;
