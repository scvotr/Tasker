import "./VenchelForm.css";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../../../../context/AuthProvider";
import { convertToFormData } from "../../../../utils/convertToFormData";
import { HOST_ADDR } from "../../../../utils/ApiHostAdres";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";

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

const removeVenchel = async (token, venchel_id, onSuccess) => {
  try {
    const data = convertToFormData(venchel_id);
    const res = await fetch(HOST_ADDR + "/venchel/removeVenchel", {
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

export const VenchelForm = (props) => {
  const { reRender, selectedVenchel } = props;

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
  console.log(formData);

  useEffect(() => {
    if (selectedVenchel) {
      setFormData({ ...formData, ...selectedVenchel });
    }
  }, [selectedVenchel]);

  const getFormData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelAddEquip = async (e) => {
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
      await sendNewVenchelData(currentUser.token, formData, setReqStatus);
      reRender(true);
    } catch (error) {
      setIsLoading(false);
      reRender(false);
      console.log("sendNewVenchelData", error);
    }
  };

  const handelRemoveEquip = async (e) => {
    e.preventDefault();
    const data = {
      task_id: formData.id,
    };
    try {
      await removeVenchel(currentUser.token, data, setReqStatus);
      reRender(true);
      console.log(data);
    } catch (error) {}
      reRender(false);
  };

  return (
    <form className="add-equip__form" onSubmit={handelAddEquip}>
      <label>
        Позиция: <nbsp />
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
        Тип: <nbsp />
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={getFormData}
        />
      </label>
      <label>
        Номер: <nbsp />
        <input
          type="text"
          name="pos_num"
          value={formData.pos_num}
          onChange={getFormData}
        />
      </label>
      <label>
        Модель: <nbsp />
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={getFormData}
        />
      </label>
      <label>
        Расположени: <nbsp />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={getFormData}
        />
      </label>
      <label>
        Мощьность: <nbsp />
        <input
          type="text"
          name="power"
          value={formData.power}
          onChange={getFormData}
        />
      </label>
      <label>
        Длина: <nbsp />
        <input
          type="text"
          name="length"
          value={formData.length}
          onChange={getFormData}
        />
      </label>
      <label>
        Высота: <nbsp />
        <input
          type="text"
          name="height"
          value={formData.height}
          onChange={getFormData}
        />
      </label>
      <div className="add-edit__btn">
        <button className="form__btn" type="submit">
          {selectedVenchel ? "Редактирование" : "Создать"}
        </button>
      </div>
      {selectedVenchel && (
        <button className="form__btn-remove" onClick={handelRemoveEquip}>
          Удалить
        </button>
      )}
    </form>
  );
};

VenchelForm.defaultProps = {
  name: 404,
};
