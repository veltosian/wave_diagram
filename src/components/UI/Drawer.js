import React from "react";
import styles from "./Drawer.module.css";
import Icon from "./Icon";

const Drawer = (props) => {
  return (
    <div className={`${styles.drawer} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Drawer;
