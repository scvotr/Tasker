const TasksControler = require('../controls/Tasks/TasksControler');
const { handleDefaultRoute } = require("../routes/handleDefaultRoute");
const { protectRouteTkPl } = require("../utils/protectRouteTkPl");

const routeHandlers = {
  "/tasks/addNewTask": TasksControler.addNewTask,
  "/tasks/getAllUserTasks": TasksControler.getAllUserTasks,
  "/tasks/getAllTasksByDep": TasksControler.getAllTasksByDep,
  "/tasks/getAllTasksBySubDep": TasksControler.getAllTasksBySubDep,
  "/tasks/getAllResponsibleTasksByDep": TasksControler.getAllResponsibleTasksByDep,
  "/tasks/getAllAppointTasksFromDep": TasksControler.getAllAppointTasksFromDep,
  "/tasks/getAllResponsibleTasksBySubDep": TasksControler.getAllResponsibleTasksBySubDep,
  "/tasks/getAllResponsibleTasksByUserId": TasksControler.getAllResponsibleTasksByUserId,
  "/tasks/updateTaskStatus": TasksControler.updateTaskStatus,
  "/tasks/updateTaskResponceSubDep": TasksControler.updateTaskResponceSubDep,
  "/tasks/updateTaskConfirmRequest": TasksControler.updateTaskConfirmRequest,
  "/tasks/updateTaskCloseRequest": TasksControler.updateTaskCloseRequest,
  "/tasks/getTaskFile": TasksControler.getTaskFile,
  "/tasks/updateTask": TasksControler.updateTask,
  "/tasks/removeTask": TasksControler.removeTask,
  "/tasks/getFullFileContent" : TasksControler.getFullFileContent,
  "/tasks/getPreviewFileContent" : TasksControler.getPreviewFileContent,
  "/tasks/updateTaskRejectRequest" : TasksControler.updateTaskRejectRequest,
};

const handleTaskRoutes = async (req, res) => {
  const { url, method } = req;
  
  try {
    if (url.startsWith("/tasks")) {
      if (method === "POST") {
        const routeHandler = routeHandlers[url];
        if (routeHandler) {
          await protectRouteTkPl(routeHandler)(req, res);
        } else {
          handleDefaultRoute(req, res);
        }
      } else {
        handleDefaultRoute(req, res);
      }
    } else {
      handleDefaultRoute(req, res);
    }
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "handleTaskRoutes - ERROR" }));
  }
};

module.exports = {
  handleTaskRoutes
};