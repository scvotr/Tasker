import { ButtonGroupByDep } from "./ButtonGroupByDep/ButtonGroupByDep";
import { useState } from "react";

export const VenchelViewByDep = ({ dep, venchels, reRender }) => {
  const [selectedButton, setSelectedButton] = useState()
  console.log('VenchelViewByDep>>>selectedButton', selectedButton)

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  let test = undefined;
  if (selectedButton === "1") {
    console.log("wwww");
  } else if (selectedButton === "2") {
    console.log("eeee");
  }

  return (
    <>
      <ButtonGroupByDep
        currentDep={dep}
        selectedButton={selectedButton}
        handleButtonClick={handleButtonClick}
      />
      {test}
    </>
  );
};
