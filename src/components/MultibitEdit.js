import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import styles from "./MultibitEdit.module.css";
import Button from "./UI/Button";
import Icon from "./UI/Icon";

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

    const formRef = multibitEditRef.current.children.namedItem("editForm");
    formRef.children.namedItem("valueInput").select();
  }, [props.coordinates.x, props.coordinates.y]);

  const handleMultibitValueChange = (e) => {
    setMultibitValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleValueUpdate();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleValueUpdate();
  };

  const handleValueUpdate = () => {
    const sequenceIndex = props.sequenceIndex;
    props.onUpdate(props.waveName, sequenceIndex, multibitValue);
    props.onClose();
  };

  return (
    <div className={styles["multibit-edit"]} ref={multibitEditRef}>
      <form id="editForm" onSubmit={handleFormSubmit}>
        <input
          id="valueInput"
          autoFocus
          type="text"
          value={multibitValue}
          onChange={handleMultibitValueChange}
          onKeyDown={handleKeyDown}
        ></input>
        <Button type="submit">
          <Icon variant="done" />
        </Button>
      </form>
    </div>
  );
};

export default MultibitEdit;
