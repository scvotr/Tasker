import { AeButtonGroup } from "./AeButtonGroup/AeButtonGroup";
import { PeButtonGroup } from "./PeButtonGroup/PeButtonGroup";

export const ButtonGroupByDep = ({
  currentDep,
  selectedButton,
  handleButtonClick,
  testLenght,
}) => {

  let buttonGroup = undefined;

  if (currentDep === 3) {
    buttonGroup = (
      <AeButtonGroup
        selectedButton={selectedButton}
        handleButtonClick={handleButtonClick}
        testLenght={testLenght}
      />
    );
  } else if (currentDep === 4) {
    buttonGroup = (
      <PeButtonGroup
        selectedButton={selectedButton}
        handleButtonClick={handleButtonClick}
        testLenght={testLenght}
      />
    );
  }

  return <>{buttonGroup}</>;
};
