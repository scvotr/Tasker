import "./RenderByAction.css";
import { TaskForm } from "../../TaskForm/TaskForm";
import { ConfirmTask } from "./ConfirmTask/ConfirmTask";
import { ApproveTask } from "./ApproveTask/ApproveTask";
import { SetResponce } from './SetResponce/SetResponce';
import { ViewTaskInfo} from './ViewTaskInfo/ViewTaskInfo'
import { SendToConfirm } from './SendToConfirm/SendToConfirm'
import { MarkAsRead } from "./MarkAsRead/MarkAsRead";


export const RenderByAction = ({ actionType, task, onTaskSubmit }) => {
  return (
    <>
      {actionType === "editTask" ? (
        <>
          <TaskForm taskToEdit={task} onTaskSubmit={onTaskSubmit} />
        </>
      ) : actionType === "approve" ? (
        <>
          <ApproveTask task={task} reRenderUp={onTaskSubmit} />
        </>
      ) : actionType === "viewOnly" ? (
        <>
          <ViewTaskInfo task={task} />
        </>
      ) : actionType === "confirmTask" ? (
        <>
          <ConfirmTask task={task} reRenderUp={onTaskSubmit} />
        </>
      ) : actionType === "setResponce" ? (
        <>
          <SetResponce task={task} reRenderUp={onTaskSubmit} />
        </>
      ) : actionType === "sendToClose" ? (
        <>
          <SendToConfirm task={task} reRenderUp={onTaskSubmit} />
        </>
      ) : actionType === "markAsRead" ? (
        <>
          <MarkAsRead task={task} reRenderUp={onTaskSubmit} />
        </>
      ) : (
        <>нет не то</>
      )}
    </>
  );
};
