import { MainMenuAdministration } from "../MainMenuAdministration/MainMenuAdministration.jsx";
import "./VenchelPageAdministration.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../context/AuthProvider.js";
import { getDataFromEndpoint } from "../../../utils/getDataFromEndpoint.js";
import { VenchelButtonGroup } from "./VenchelButtonGroup/VenchelButtonGroup.jsx";
import { VenchelViewByDep } from "./VenchelViewByDep/VenchelViewByDep.jsx";

const AE_ID = 3;
const PE_ID = 4;

export const VenchelPageAdministration = () => {
  const currentUser = useAuthContext()
  const [resStaus, setReqStatus] = useState(null)
  const [selectedButton, setSelectedButton] = useState()
  const [taskFormKey, setTaskFormKey] = useState(0);

  const [ae_venchels, setAe_venchels] = useState({
    venchels: undefined,
    count: undefined,
  })
  const [pe_venchels, setPe_venchels] = useState({
    venchels: undefined,
    count: undefined,
  })

  const handleMenuButtonClick = (button) => {
    setSelectedButton(button)
  }

  const  handleReRenderVPA = (isUpdated) => {
    setTaskFormKey((prevKey) => prevKey + 1)
  }

  useEffect(() => {
    if (currentUser.login) {
      try {
        getDataFromEndpoint(currentUser.token, "/venchel/getAllVenchels", "POST", setReqStatus)
        .then(venchels => {
          const ae_venchels = venchels.filter( venchel => venchel.department_id === AE_ID)
          setAe_venchels( prev => ({
            ...prev,
            venchels: ae_venchels,
            count : ae_venchels.length
          }))
          const pe_venchels = venchels.filter( venchel => venchel.department_id === PE_ID)
          setPe_venchels( prev => ({
            ...prev,
            venchels: pe_venchels,
            count : pe_venchels.length
          }))
        })
      } catch (error) {}
    }
  }, [currentUser]);

  let venchelByDepartment = undefined;

  if(selectedButton === 'dep_ae') {
    venchelByDepartment = <VenchelViewByDep dep={AE_ID} venchels={ae_venchels} reRender={handleReRenderVPA}/>
  } else if (selectedButton === 'dep_pe') {
    venchelByDepartment = <VenchelViewByDep dep={PE_ID} venchels={pe_venchels} reRender={handleReRenderVPA}/>
  }

  return (
    <div className="admin-venchel-page">
      <div className="admin-venchel-page__container">
        Редактирование оборудования {resStaus}
      </div>
      <div className="admin-venchel-page__container">
        <MainMenuAdministration />
      </div>
      <div className="admin-venchel__body">
        <VenchelButtonGroup
          handleButtonClick={handleMenuButtonClick}
          selectedButton={selectedButton}
          venchelAeCount={ae_venchels.count}
          venchelPeCount={pe_venchels.count}
        />
        {venchelByDepartment}
      </div>
    </div>
  );
};
