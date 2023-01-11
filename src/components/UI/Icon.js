import React from "react";
import styles from "./Icon.module.css";

const Icon = (props) => {
  return (
    <span
      className={`material-symbols-outlined ${props.className}`}
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
    >
      {props.variant}
    </span>
  );
};

export default Icon;
