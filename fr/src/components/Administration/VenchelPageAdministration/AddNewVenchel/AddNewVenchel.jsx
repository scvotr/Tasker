import './AddNewVenchel.css'

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../../../../context/AuthProvider";
import { convertToFormData } from "../../../../utils/convertToFormData";
import { HOST_ADDR } from "../../../../utils/ApiHostAdres";
import {QRCodeSVG, QRCodeCanvas} from 'qrcode.react';


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
  const { reRender } = props
  const currentUser = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [reqStatus, setReqStatus] = useState();

  
  
  const [equipmentId, setEquipmentId] = useState(uuidv4());

  const [qrCodeValue, setQrCodeValue] = useState(equipmentId); // Состояние для значения, используемого для генерации QR кода
  
  const equipmentInitVal = {
    id: equipmentId,
    position: "",
    type: "",
    pos_num: "",
    model: "",
    location: "",
    power: "",
    length: "",
    width: "",
    height: "",
  };

  const [formData, setFormData] = useState(equipmentInitVal);
  console.log(formData)

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
      position: "",
      type: "",
      pos_num: "",
      model: "",
      location: "",
      power: "",
      length: "",
      width: "",
      height: "",
    };
    setFormData(newEquipmentInitVal);
    setEquipmentId(newEquipmentId);
    try {
      await sendNewVenchelData(currentUser.token, formData, setReqStatus)
      reRender(true)
    } catch (error) {
      setIsLoading(false)
      reRender(false)
      console.log('sendNewVenchelData', error)
    }
  };

  return (
    <form className="add-equip__form" onSubmit={addEquip}>
      <label>
        Позиция: <nsbp></nsbp>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={getFormData}
          />
      </label>
          {/* {qrCodeValue && <QRCodeSVG  value={qrCodeValue} size={128} />} */}
          {/* {qrCodeValue && <QRCodeCanvas   value={qrCodeValue} size={128} />} */}
      <label>
        Тип: <nsbp></nsbp>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={getFormData}
        />
      </label>
      <label>
        Номер: <nsbp></nsbp>
        <input
          type="text"
          name="pos_num"
          value={formData.pos_num}
          onChange={getFormData}
        />
      </label>
      <label>
        Модель: <nsbp></nsbp>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={getFormData}
        />
      </label>
      <label>
        Расположени: <nsbp></nsbp>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={getFormData}
        />
      </label>
      <label>
        Мощьность: <nsbp></nsbp>
        <input
          type="text"
          name="power"
          value={formData.power}
          onChange={getFormData}
        />
      </label>
      <label>
        Длина: <nsbp></nsbp>
        <input
          type="text"
          name="length"
          value={formData.length}
          onChange={getFormData}
        />
      </label>
      <label>
        Высота: <nsbp></nsbp>
        <input
          type="text"
          name="height"
          value={formData.height}
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