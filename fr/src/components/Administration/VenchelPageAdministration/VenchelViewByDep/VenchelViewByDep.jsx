import { ButtonGroupByDep } from "./ButtonGroupByDep/ButtonGroupByDep";
import { useState } from "react";
import { VenchelTableComponent } from '../VenchelTableComponent/VenchelTableComponent'


export const VenchelViewByDep = ({ dep, venchels, reRender }) => {
  const [selectedButton, setSelectedButton] = useState()
  console.log('VenchelViewByDep >>>  selectedButton', selectedButton)

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  let test = undefined;
  if (selectedButton === "dep_ae_1") {
     test = <VenchelTableComponent  dep={dep} venchels={venchels} reRender={reRender} />
  } else if (selectedButton === "dep_ae_2") {
    console.log("2 элеватор А")
    test = <VenchelTableComponent  dep={dep} venchels={venchels} reRender={reRender} />
  } else if (selectedButton === "dep_pe_1") {
    console.log("1 элеватор П")
    test = <VenchelTableComponent  dep={dep} venchels={venchels} reRender={reRender} />
  } else if (selectedButton === "dep_pe_2") {
    console.log("2 элеватор П")
    test = <VenchelTableComponent  dep={dep} venchels={venchels} reRender={reRender} />
  } else if (selectedButton === "dep_pe_3") {
    console.log("5 склад")
    test = <VenchelTableComponent  dep={dep} venchels={venchels} reRender={reRender} />
  } else if (selectedButton === "dep_pe_4") {
    console.log("Склады")
    test = <VenchelTableComponent  dep={dep} venchels={venchels} reRender={reRender} />
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
