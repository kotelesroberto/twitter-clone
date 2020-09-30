import React from "react";
import "./SidebarOption.scss";

const SidebarOption = ({ active, text, Icon, Character, nature }) => {
  return (
    <div
      className={`sidebarOption ${active && "sidebarOption--active"} ${
        nature === "demo" && "sidebarOption--demo"
      }`}
    >
      {Icon && <Icon />}
      {Character && <span className="MuiSvgIcon-root">{Character}</span>}
      <h2>{text}</h2>
    </div>
  );
};

export default SidebarOption;
