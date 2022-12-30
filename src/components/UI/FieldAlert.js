import React, { useState } from "react";
import styles from "./FieldAlert.module.css";
import Icon from "./Icon";

const FieldAlert = (props) => {
  const validVariants = ["warning", "error", "info"];

  return (
    <div
      className={
        validVariants.includes(props.variant) ? props.variant : styles["info"]
      }
    >
      <Icon variant="subdirectory_arrow_right" />
      {props.children}
      {props.message}
    </div>
  );
};

export default FieldAlert;
