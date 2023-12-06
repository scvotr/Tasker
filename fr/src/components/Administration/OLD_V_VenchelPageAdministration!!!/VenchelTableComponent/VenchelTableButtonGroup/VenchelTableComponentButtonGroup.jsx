import { PeButtonGroup } from "../PeButtonGroup/PeButtonGroup";
import { AeButtonGroup } from "./AeButtonGroup/AeButtonGroup";

export const VenchelTableComponentButtonGroup = ({
  currentDep,
  selectedButton,
  handleButtonClick,
  venchelPe_1_Count,
  venchelPe_2_Count,
  venchelPe_3_Count,
  venchelPe_4_Count,
  venchelAe_5_Count,
  venchelAe_6_Count,
}) => {
  let buttonGroup;

  if (currentDep === 3) {
    buttonGroup = (
      <AeButtonGroup
        selectedButton={selectedButton}
        handleButtonClick={handleButtonClick}
      />
    );
  } else if (currentDep === 4) {
    buttonGroup = (
      <PeButtonGroup
        selectedButton={selectedButton}
        handleButtonClick={handleButtonClick}
      />
    );
  }

  return <>{buttonGroup}</>;
};
