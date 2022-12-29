import React from 'react';

const Icon = (props) => {
  return (
    <span
      className="material-symbols-outlined"
      onClick={props.onClick}
      style={{ cursor: 'pointer' }}
    >
      {props.variant}
    </span>
  );
};

export default Icon;
