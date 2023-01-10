import React, { useRef, useEffect } from "react";
import styles from "./Card.module.css";
import useClickOutside from "../../hooks/useClickOutside";

const Card = (props) => {
  const cardRef = useRef(null);
  useClickOutside(cardRef, props.onClickOutside);

  return (
    <div ref={cardRef} className={`${styles.card} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Card;
