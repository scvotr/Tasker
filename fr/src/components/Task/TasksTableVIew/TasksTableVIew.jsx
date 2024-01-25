import "./TasksTableVIew.css";
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import { Modal } from "../../Modal/Modal";
import { RenderByAction } from "./RenderByAction/RenderByAction";
import { Deadline } from "./TaskTableComponents/Deadline/Deadline";
import { TaskStatus } from "./TaskTableComponents/TaskStatus/TaskStatus";

export const TasksTableVIew = ({ tasks, actionType, test, rowForPage }) => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const dateA = new Date(a.created_on);
      const dateB = new Date(b.created_on);
      return dateB - dateA;
    });
  }, [tasks]);

  // ----------------------PAGINATION---------------------------------------------------------------
  // задаем количество задач на странице
  const tasksPerPage = rowForPage;
  // используем хук useParams для получения текущего номера страницы из URL
  const {pageNumber } = useParams();
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber ) || 1);
  // возвращает список задач для текущей выбранной страницы
  const getCurrentTasks = () => {
    const offset = (currentPage - 1) * tasksPerPage; // Рассчитываем смещение для текущей страницы
    const sortedTasksSlice = sortedTasks.slice(offset, offset + tasksPerPage); // Выбираем задачи для текущей страницы

    if (sortedColumn) {
      sortedTasksSlice.sort((a, b) => {
        const valueA = a[sortedColumn];
        const valueB = b[sortedColumn];

        if (sortDirection === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      });
    }

    // return sortedTasks.slice(firstIndex, lastIndex);
    return sortedTasksSlice;
  };
  // вычисление количества страниц
  const pageCount = Math.ceil(sortedTasks.length / tasksPerPage);
  // Обработчики переходов
  const handleNextClick = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // ----------------------PAGINATION---------------------------------------------------------------

  // 24/08
  const handleSortClick = (column) => {
    if (column === sortedColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortDirection("asc");
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };
  const closeModal = () => {
    setSelectedTask(null);
    setModalOpen(false);
  };

  const [isTaskSubmitted, setIsTaskSubmitted] = useState(false);
  const [taskFormKey, setTaskFormKey] = useState(0);

  // Управление нажатием из таблицы
  const handleTaskSubmitAndClose = (isSuccess) => {
    // Вызов хендлера из TasksTableVIew => handleTaskOnModalSubmit
    setIsTaskSubmitted(isSuccess);
    setTaskFormKey((prevKey) => prevKey + 1); // Изменение ключа при каждой отправке формы
    closeModal();
    // это функция обновления главное страницы из пропсов и я просто ее вызываю верхний блок кода
    test();
  };

  return (
    <>
      {!sortedTasks.length > 0 && <div className="no-tasks">Задач нет.</div>}

      {selectedTask && (
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <RenderByAction
            actionType={actionType}
            task={selectedTask}
            onTaskSubmit={handleTaskSubmitAndClose}
          />
        </Modal>
      )}

      <div className="pagination-button">
        <button className="user-menu__button" onClick={handlePrevClick}>Назад</button>
        {currentPage} из {pageCount}
        <button className="user-menu__button" onClick={handleNextClick}>Вперед</button>
      </div>

      <div className="table-view">
        <table className="table-bordered">
          <thead>
            <tr>
              <th>№</th>
              <th onClick={() => handleSortClick("task_descript")}>Задача</th>
              <th onClick={() => handleSortClick("created_on")}>Создана</th>
              <th onClick={() => handleSortClick("task_status")}>Статус</th>
              <th onClick={() => handleSortClick("appoint_user_name")}>От</th>
              <th onClick={() => handleSortClick("responsible_department_name")}>Для</th>
              {actionType !== "editTask" && (
                <th onClick={() => handleSortClick("appoint_user_name")}>
                  Отвественый
                </th>
              )}
              <th onClick={() => handleSortClick("deadline")}>Выполнить до</th>
              <th>Файлы</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentTasks().map((task, index) => (
              <tr key={index} onClick={() => openModal(task)}>
                <td>{(currentPage - 1) * tasksPerPage + index + 1}</td>
                <td>{task.task_descript.substring(0, 25)} ... </td>
                <td>{formatDate(task.created_on)}</td>
                <td>
                  {task.approved_on ? (
                    <TaskStatus staus={task.task_status}/>
                  ) : (
                    <>Требует согласования</>
                  )}
                </td>
                <td>{task.appoint_user_name}</td>

                <td>
                  {task.responsible_department_name ? (
                    <>{task.responsible_department_name}</>
                  ) : (
                    <>внутренняя задача</>
                  )}
                </td>
                {actionType !== "editTask" && (
                  <td>
                    {task.responsible_position_name ? (
                      <>{task.responsible_position_name}</>
                    ) : (
                      <>не назначено</>
                    )}
                  </td>
                )}
                <Deadline date={task.deadline}/>
                <td>
                  {task.old_files && task.old_files.length > 0 ? (
                    <>
                      <>Файлы есть</>
                    </>
                  ) : (
                    "данных нет"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
