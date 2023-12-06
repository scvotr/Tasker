import { ButtonGroupByDep } from "./ButtonGroupByDep/ButtonGroupByDep";
import { useEffect, useState } from "react";
import { VenchelTableComponent } from '../VenchelTableComponent/VenchelTableComponent'

const dep_ae_1_ID = 1
const dep_ae_2_ID = 2
const dep_pe_1_ID = 3
const dep_pe_2_ID = 4
const dep_pe_3_ID = 5
const dep_pe_4_ID = 6

export const VenchelViewByDep = ({ dep, venchels, reRender }) => {
  const [selectedButton, setSelectedButton] = useState()
  const [aaa, setAaaa] = useState({})

  useEffect(()=> {
    const sc_1 = venchels.venchels.filter(venchel => venchel.sector_id === dep_ae_1_ID)
    setAaaa(prev => ({
      ...prev,
      sc_1: sc_1,
      sc_1_l : sc_1.length,
    }))
    const sc_2 = venchels.venchels.filter(venchel => venchel.sector_id === dep_ae_2_ID)
    setAaaa(prev => ({
      ...prev,
      sc_2: sc_2,
      sc_2_l : sc_2.length,
    }))
    const sc_3 = venchels.venchels.filter(venchel => venchel.sector_id === dep_pe_1_ID)
    setAaaa(prev => ({
      ...prev,
      sc_3: sc_3,
      sc_3_l : sc_3.length,
    }))
    const sc_4 = venchels.venchels.filter(venchel => venchel.sector_id === dep_pe_2_ID)
    setAaaa(prev => ({
      ...prev,
      sc_4: sc_4,
      sc_4_l : sc_4.length,
    }))
    const sc_5 = venchels.venchels.filter(venchel => venchel.sector_id === dep_pe_3_ID)
    setAaaa(prev => ({
      ...prev,
      sc_5: sc_5,
      sc_5_l : sc_5.length,
    }))
    const sc_6 = venchels.venchels.filter(venchel => venchel.sector_id === dep_pe_4_ID)
    setAaaa(prev => ({
      ...prev,
      sc_6: sc_6,
      sc_6_l : sc_6.length,
    }))
  }, [venchels])

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  let test = undefined;
  if (selectedButton === "dep_ae_1") {
    test = <VenchelTableComponent  dep={dep} sector={dep_ae_1_ID} venchels={aaa.sc_1} reRender={reRender} />
  } else if (selectedButton === "dep_ae_2") {
    test = <VenchelTableComponent  dep={dep} sector={dep_ae_2_ID} venchels={aaa.sc_2} reRender={reRender} />
  } else if (selectedButton === "dep_pe_1") {
    test = <VenchelTableComponent  dep={dep} sector={dep_pe_1_ID} venchels={aaa.sc_3} reRender={reRender} />
  } else if (selectedButton === "dep_pe_2") {
    test = <VenchelTableComponent  dep={dep} sector={dep_pe_2_ID} venchels={aaa.sc_4} reRender={reRender} />
  } else if (selectedButton === "dep_pe_3") {
    test = <VenchelTableComponent  dep={dep} sector={dep_pe_3_ID} venchels={aaa.sc_5} reRender={reRender} />
  } else if (selectedButton === "dep_pe_4") {
    test = <VenchelTableComponent  dep={dep} sector={dep_pe_4_ID} venchels={aaa.sc_6} reRender={reRender} />
  }

  return (
    <>
      <ButtonGroupByDep
        currentDep={dep}
        selectedButton={selectedButton}
        handleButtonClick={handleButtonClick}
        testLenght = {aaa}
      />
      {test}
      
    </>
  );
};


// export const VenchelViewByDep = ({ dep, venchels, reRender }) => {
//   const [selectedButton, setSelectedButton] = useState()
//   const [aaa, setAaaa] = useState({})

//   const sectors = [
//     { id: dep_ae_1_ID, key: 'sc_1' },
//     { id: dep_ae_2_ID, key: 'sc_2' },
//     { id: dep_pe_1_ID, key: 'sc_3' },
//     { id: dep_pe_2_ID, key: 'sc_4' },
//     { id: dep_pe_3_ID, key: 'sc_5' },
//     { id: dep_pe_4_ID, key: 'sc_6' },
//   ];

//   useEffect(() => {
//     const updatedAaaa = {};
//     sectors.forEach((sector) => {
//       const filteredVenchels = venchels.venchels.filter(
//         (venchel) => venchel.sector_id === sector.id
//       );
//       updatedAaaa[sector.key] = filteredVenchels;
//       updatedAaaa[`${sector.key}_l`] = filteredVenchels.length;
//     });
//     setAaaa(updatedAaaa);
//   }, [venchels]);

//   const handleButtonClick = (button) => {
//     setSelectedButton(button);
//   };

//   let test = undefined;
//   sectors.forEach((sector) => {
//     if (selectedButton === `dep_${sector.key}`) {
//       test = (
//         <VenchelTableComponent
//           dep={dep}
//           sector={sector.id}
//           venchels={aaa[sector.key]}
//           reRender={reRender}
//         />
//       );
//     }
//   });

//   return (
//     <>
//       <ButtonGroupByDep
//         currentDep={dep}
//         selectedButton={selectedButton}
//         handleButtonClick={handleButtonClick}
//         testLength={aaa}
//       />
//       {test}
//     </>
//   );
// };