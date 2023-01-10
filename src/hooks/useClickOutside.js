import React, { useEffect } from "react";

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

export default useClickOutside;
