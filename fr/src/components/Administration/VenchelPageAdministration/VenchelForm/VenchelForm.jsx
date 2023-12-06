import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ImageBlock } from "../../../Task/TaskForm/ImageBlock/ImageBlock";
import { sendDataToEndpoint } from "../../../../utils/sendDataToEndpoint";
import { useAuthContext } from "../../../../context/AuthProvider";
import { VenchelTextFields } from './VenchelTextFields/VenchelTextFields'


export const VenchelForm = ({dep, sector, reRender}) => {
  const currentUser = useAuthContext()
  const initValue = {
    venchel_id: uuidv4(),
    position: "",
    type: "",
    pos_num: "",
    model: "",
    location: "",
    power: "",
    length: "",
    width: "",
    height: "",
    department_id: dep,
    sector: sector,
    files: [],
    filePreviews: [],
    filesToRemove: [],
    task_files: [],
  };

}