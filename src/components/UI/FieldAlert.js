import React, { useState } from "react";
import styles from "./FieldAlert.module.css";
import Icon from "./Icon";

const FieldAlert = (props) => {
  const validVariants = ["warning", "error", "info"];

  const appliedClass = validVariants.includes(props.variant)
    ? styles[props.variant]
    : styles["info"];

  return (
    <div className={`${styles["alert-box"]} ${appliedClass}`}>
      <Icon variant="subdirectory_arrow_right" />
      {props.children}
    </div>
  );
};

export default FieldAlert;
