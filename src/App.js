import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Login from "./Components/Login/Login";
import General from "./Components/General/General";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import Sidebar from "./Components/Sidebar/Sidebar";
import Feed from "./Components/Feed/Feed";
import Widgets from "./Components/Widgets/Widgets";

// React Context
import { useStateValue } from "./StateProvider";

// firebase
import { auth } from "./firebase/firebase";

function App() {
  // context data
  const [{ user, loginScreenType }, dispatch] = useStateValue();

  // a "listener"
  useEffect(() => {
    // will only run once when the app component loads, add the auth listener when user status changing
    auth.onAuthStateChanged((authUser) => {
      console.log("the user is >>>", authUser);

      if (authUser) {
        // the user just logged in / the user was logged
        let tempAuthUser = { ...authUser };

        tempAuthUser.photoURL =
          "https://m.media-amazon.com/images/I/51qyXfsyjRL._AA256_.jpg";
        tempAuthUser.username = "JimiHendrix";

        dispatch({
          type: "SET_USER",
          user: tempAuthUser,
        });
      } else {
        // the user is locked out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className={user ? "App max-width" : "App"}>
        {/* {!user && loginScreenType === "landing" ? (
          <LoginScreen />
        ) : (
          <Login />
        )} */}

        {!user && loginScreenType === "landing" && <LoginScreen />}
        {!user && loginScreenType === "panel" && <Login />}

        {user && (
          <>
            <Switch>
              <Route path="/login"></Route>
              <Route path="/">
                <Sidebar key="sidebar" />
              </Route>
            </Switch>

            <Switch>
              <Route path="/explore">
                <General text="explore" />
              </Route>
              <Route path="/notifications">
                <General text="notifications" />
              </Route>
              <Route path="/messages">
                <General text="messages" />
              </Route>
              <Route path="/bookmarks">
                <General text="bookmarks" />
              </Route>
              <Route path="/lists">
                <General text="lists" />
              </Route>
              <Route path="/profile">
                <General text="profile" />
              </Route>
              <Route path="/more">
                <General text="more" />
              </Route>
              {/* 
              <Route path="/login">
                <Login key="login" />
              </Route> */}

              <Route path="/home">
                <Feed key="feed" />
              </Route>
              <Route path="/">
                <Feed key="feed" />
              </Route>
            </Switch>

            <Switch>
              <Route path="/login"></Route>
              <Route path="/">
                <Widgets key="widgets" />
              </Route>
            </Switch>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
