import { useEffect, useState } from "react";
import "./GeneralSpComponents.css";
import { useAuthContext } from "../../../../../context/AuthProvider";
import { getDataFromEndpoint } from "../../../../../utils/getDataFromEndpoint";

export const GeneralSpComponents = () => {
  const currentUser = useAuthContext();
  const [reqStatus, setReqStatus] = useState(null);
  const [allTasks, setAllTasks] = useState();
  console.log(allTasks);

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
  }, [currentUser]);

  return (
    <>
      {reqStatus === null ? (
        <>Loading...</>
      ) : (
        <>
          {reqStatus === "ok" ? (
            <div>

            </div>
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
