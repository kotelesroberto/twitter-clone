import React from "react";
import "./General.scss";

const General = ({ text }) => {
  return (
    <div className="general">
      <div className="general__header">
        <h2>{text}</h2>
      </div>
    </div>
  );
};

export default General;
