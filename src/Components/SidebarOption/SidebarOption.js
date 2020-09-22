import React from "react";
import "./SidebarOption.scss";

const SidebarOption = ({ active, text, Icon, Character }) => {
  return (
    <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
      {Icon && <Icon />}
      {Character && <span className="MuiSvgIcon-root">{Character}</span>}
      <h2>{text}</h2>
    </div>
  );
};

export default SidebarOption;
