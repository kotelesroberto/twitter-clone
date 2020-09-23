import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import General from "./Components/General/General";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import Sidebar from "./Components/Sidebar/Sidebar";
import Feed from "./Components/Feed/Feed";
import Widgets from "./Components/Widgets/Widgets";

// React Context
import { useStateValue } from "./StateProvider";

function App() {
  // context data
  const [{ user }, dispatch] = useStateValue();
  return (
    <Router>
      <div className={user ? "App max-width" : "App"}>
        {!user && <LoginScreen />}

        {user && (
          <>
            <Sidebar />

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

              <Route path="/home">
                <Feed />
              </Route>
              <Route path="/">
                <Feed />
              </Route>
            </Switch>

            <Widgets />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
