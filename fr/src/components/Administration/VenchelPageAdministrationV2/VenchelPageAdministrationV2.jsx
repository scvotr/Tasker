import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthProvider";
import { MainMenuAdministration } from "../MainMenuAdministration/MainMenuAdministration";
import "./VenchelPageAdministrationV2.css";
import { getDataFromEndpoint } from "../../../utils/getDataFromEndpoint";

export const VenchelPageAdministrationV2 = () => {
  const currentUser = useAuthContext();
  const [resStatus, setReqStatus] = useState();
  const [depList, setDepList] = useState();
  const [workshopList, setWorkshopList] = useState([]);
  const [selectedButton, setSelectedButton] = useState()
  console.log('workshopList', workshopList);

  useEffect(() => {
    if (currentUser.login) {
      try {
        getDataFromEndpoint(currentUser.token, "/orgStruct/getDepartmentsFrom", "POST", null, setReqStatus)
          .then((data) => {
            setDepList(data);
            const workshopRequests = data.map((dep) =>
              getDataFromEndpoint(currentUser.token, "/orgStruct/getWorkshopsByDepID", "POST", dep.id, setReqStatus)
            );
            Promise.all(workshopRequests).then((workshopData) => {
              const updatedWorkshopList = workshopData.map((workshop, index) => ({
                dep_id: data[index].id,
                workshops: workshop,
              }));
              setWorkshopList(updatedWorkshopList);
            });
          });
      } catch (error) {
        // Обработка ошибки
      }
    }
  }, [currentUser]);

  return (
    <div className="admin-venchel-page">
      <MainMenuAdministration />

      {workshopList.map((item) => (
        <div key={item.dep_id}>
          <h3>Департамент ID: {item.dep_id}</h3>
          <ul>
            {item.workshops.map((workshop) => (
              <li key={workshop.id}>{workshop.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
