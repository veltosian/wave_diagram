import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import styles from "./MultibitEdit.module.css";

const MultibitEdit = (props) => {
  const multibitEditRef = useRef(null);
  useClickOutside(multibitEditRef, props.onClose);
  const [multibitValue, setMultibitValue] = useState(props.defaultValue);

  useEffect(() => {
    multibitEditRef.current.style.setProperty(
      "--position-x",
      props.coordinates.x + "px"
    );
    multibitEditRef.current.style.setProperty(
      "--position-y",
      props.coordinates.y + "px"
    );

    multibitEditRef.current.children.namedItem("valueInput").select();
  }, [props.coordinates.x, props.coordinates.y]);

  const handleMultibitValueChange = (e) => {
    setMultibitValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    const sequenceIndex = props.sequenceIndex;
    if (e.key === "Enter") {
      props.onUpdate(props.waveName, sequenceIndex, e.target.value);
      props.onClose();
    }
  };

  return (
    <div className={styles["multibit-edit"]} ref={multibitEditRef}>
      <input
        id="valueInput"
        autoFocus
        type="text"
        value={multibitValue}
        onChange={handleMultibitValueChange}
        onKeyDown={handleKeyDown}
      ></input>
    </div>
  );
};

export default MultibitEdit;
