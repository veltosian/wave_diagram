import { useState } from "react";

const useMultibitEdit = () => {
  const [multibitSequenceIndex, setMultibitSequenceIndex] = useState(null);
  const [multibitValueDefault, setMultibitValueDefault] = useState(null);
  const [multibitEditVisible, setMultibitEditVisible] = useState(false);
  const [multibitEditCoordinates, setMultibitEditCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const openMultibitEdit = () => {
    setMultibitEditVisible(true);
  };

  const closeMultibitEdit = () => {
    setMultibitEditVisible(false);
  };

  const initiateMultibitEdit = (wave, action) => {
    setMultibitEditCoordinates(action.mouseCoordinates);
    setMultibitValueDefault(wave.sequence[action.sequenceIndex]);
    setMultibitSequenceIndex(action.sequenceIndex);
    openMultibitEdit();
  };

  return {
    multibitValueDefault,
    multibitEditVisible,
    multibitEditCoordinates,
    multibitSequenceIndex,
    closeMultibitEdit,
    initiateMultibitEdit,
  };
};

export default useMultibitEdit;
