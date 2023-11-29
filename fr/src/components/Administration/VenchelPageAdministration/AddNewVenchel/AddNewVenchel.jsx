import './AddNewVenchel.css'

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../../../../context/AuthProvider";
import { convertToFormData } from "../../../../utils/convertToFormData";
import { HOST_ADDR } from "../../../../utils/ApiHostAdres";

export const sendNewVenchelData = async (token, formData, onSuccess) => {
  delete formData.filePreviews;
  const data = convertToFormData(formData);
  try {
    const res = await fetch(HOST_ADDR + "/venchel/addNewVenchel", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    });
    if (res.ok) {
      const responseData = await res.json();
      onSuccess(responseData);
    } else {
      throw new Error("Server response was not ok");
    }
  } catch (error) {
    onSuccess(error);
  }
};

export const AddNewVenchel = (props) => {
  const currentUser = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [reqStatus, setReqStatus] = useState();

  const [equipmentId, setEquipmentId] = useState(uuidv4());

  const equipmentInitVal = {
    id: equipmentId,
    name: "",
    name2: "",
  };

  const [formData, setFormData] = useState(equipmentInitVal);

  const getFormData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addEquip = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newEquipmentId = uuidv4();
    const newEquipmentInitVal = {
      id: newEquipmentId,
      name: "",
      name2: "",
    };
    console.log("!!!", formData);
    setFormData(newEquipmentInitVal);
    setEquipmentId(newEquipmentId);
    try {
      await sendNewVenchelData(currentUser.token, formData, setReqStatus)
    } catch (error) {
      setIsLoading(false)
      console.log('sendNewVenchelData', error)
    }
  };

  return (
    <form className="add-equip__form" onSubmit={addEquip}>
      <label>
        Номер:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={getFormData}
        />
      </label>
      <label>
        Название:
        <input
          type="text"
          name="name2"
          value={formData.name2}
          onChange={getFormData}
        />
      </label>
      <button type="submit">add</button>
    </form>
  );
};

AddNewVenchel.defaultProps = {
  name: 404,
};
