import { useEffect, useState } from "react";
import "./GeneralSpComponents.css";
import { useAuthContext } from "../../../../../context/AuthProvider";
import { getDataFromEndpoint } from "../../../../../utils/getDataFromEndpoint";
import { RenderTasksTable } from "../../../../Task/RenderTasksTable/RenderTasksTable";
import { V2UserComponents } from "../V2UserComponents/V2UserComponents";

export const GeneralSpComponents = () => {
  const currentUser = useAuthContext();
  const [reqStatus, setReqStatus] = useState(null);
  const [allTasks, setAllTasks] = useState(); console.log('allTasks', allTasks)
  const [taskFormKey, setTaskFormKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataFromEndpoint(
          currentUser.token,
          "/admin/getAllTasks",
          "POST",
          null,
          setReqStatus
        );
        setAllTasks(data);
        setReqStatus("ok");
      } catch (error) {
        setReqStatus(error.message); // Устанавливаем сообщение об ошибке в состояние
      }
    };
    fetchData();
  }, [currentUser, taskFormKey]);

  return (
    <>
      {reqStatus === null ? (
        <>Loading...</>
      ) : (
        <>
          {reqStatus === "ok" ? (
            <>
              <div>
                {/* <V2UserComponents updateToTop={setTaskFormKey}/> */}
              </div>
              <div>
                <RenderTasksTable tasks={allTasks} actionType='viewOnly' rowForPage='15'/>
              </div>
            </>
          ) : (
            <div>
              {reqStatus} {/* Отображение сообщения об ошибке */}
            </div>
          )}
        </>
      )}
    </>
  );
};
