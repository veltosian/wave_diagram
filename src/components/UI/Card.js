import React, { useRef, useEffect } from "react";
import styles from "./Card.module.css";

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler && handler();
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Deselect on cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

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
