import "./UserPageAdministration.css";
import { MainMenuAdministration } from "../MainMenuAdministration/MainMenuAdministration";
import { useAuthContext } from "../../../context/AuthProvider";
import { useEffect, useState } from "react";
import { HOST_ADDR } from "../../../utils/ApiHostAdres";
import { getAllUsers } from "./API/getAllUsers";
import { sendUpadteUserData } from './API/sendUpadteUserData'
import { TableUserView } from "./TableUserView/TableUserView";

export const UserPageAdministration = () => {
  const currentUser = useAuthContext();
  const [users, setUsers] = useState([]);
  const [reqStatus, setReqStatus] = useState(null);
  const [userUpdated, setUserUpdated] = useState(false)

  useEffect(() => {
    if (currentUser.login) {
      try {
        getAllUsers(currentUser.token, HOST_ADDR, setReqStatus)
          .then((data) => setUsers(data))
          .catch((error) => setReqStatus(error));
      } catch (error) {}
    }
  }, [currentUser, userUpdated]);

  const handleUpdateUserData = async(user) => {
    try {
      setUserUpdated(true)
      await sendUpadteUserData(currentUser.token, user, HOST_ADDR, setReqStatus)
      setUserUpdated(false)
    } catch (error) {
      setUserUpdated(error)
    }
  }

  return (
    <div className="admin-user-page">
      <div className="admin-user__container ">Редактирование пользователей</div>
      <div className="admin-user__container ">
        <MainMenuAdministration />
      </div>
      <div className="admin-user__message">{reqStatus !== null ? <p>{reqStatus}</p> : <></>}</div>
      <div className="admin-user__body">
        <TableUserView 
          users = {users}
          onUpdate = {handleUpdateUserData}
        />
      </div>
    </div>
  );
};
