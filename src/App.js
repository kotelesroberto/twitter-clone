import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import Sidebar from "./Components/Sidebar/Sidebar";
import Feed from "./Components/Feed/Feed";
import Widgets from "./Components/Widgets/Widgets";

import { useStateValue } from "./StateProvider";

function App() {
  // context data
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className={user ? "App max-width" : "App"}>
      {user && (
        <>
          <Sidebar />
          <Feed />
          <Widgets />
        </>
      )}

      {!user && <LoginScreen />}
    </div>
  );
}

export default App;
