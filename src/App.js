import React from "react";
import "./App.scss";
import Feed from "./Components/Feed/Feed";
import Sidebar from "./Components/Sidebar/Sidebar";
import Widgets from "./Components/Widgets/Widgets";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  );
}

export default App;
