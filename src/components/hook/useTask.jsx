import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { fireDB } from "../config/firebase";

const useTask = () => {
  const [tasks, setTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [scheduledTasks, setScheduledTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);
  const [fetchedTaskDetails, setFetchedTaskDetails] = useState(null);

  const itemsPerPage = 6;

  const fetchTasks = async () => {
    try {
      const tasksCollection = query(
        collection(fireDB, "tasks"),
        orderBy("dateTime", "asc")
      );
      const tasksSnapshot = await getDocs(tasksCollection);
      const tasksData = tasksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const now = new Date();
      const todayTasksData = tasksData.filter((task) => {
        const taskDate = task.dateTime.toDate();
        return (
          taskDate.getDate() === now.getDate() &&
          taskDate.getMonth() === now.getMonth() &&
          taskDate.getFullYear() === now.getFullYear()
        );
      });

      const scheduledTasksData = tasksData.filter((task) => {
        const taskDate = task.dateTime.toDate();
        const isPastDateTime = taskDate < now;
        const isToday =
          taskDate.getDate() === now.getDate() &&
          taskDate.getMonth() === now.getMonth() &&
          taskDate.getFullYear() === now.getFullYear();

        return !task.completed && !isToday && !isPastDateTime;
      });

      const completedTasksData = tasksData.filter((task) => task.completed);

      setTasks(tasksData);
      setTodayTasks(todayTasksData);
      setScheduledTasks(scheduledTasksData);
      setCompletedTasks(completedTasksData);
      setAllTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTimeRemaining = (endTime) => {
    const now = new Date();
    const difference = endTime - now;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, total: difference };
  };

  const updateCountdown = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        const { days, hours, minutes, seconds, total } = calculateTimeRemaining(
          task.dateTime.toDate()
        );

        if (total <= 0 && !task.completed) {
          setCompletedTasks((prevCompletedTasks) => [
            ...prevCompletedTasks,
            task,
          ]);
          return {
            ...task,
            completed: true,
            countdown: { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 },
          };
        }

        return { ...task, countdown: { days, hours, minutes, seconds, total } };
      })
    );

    setTodayTasks((prevTodayTasks) =>
      prevTodayTasks.map((task) => {
        const { days, hours, minutes, seconds, total } = calculateTimeRemaining(
          task.dateTime.toDate()
        );
        return {
          ...task,
          countdown: { days, hours, minutes, seconds, total },
        };
      })
    );

    setScheduledTasks((prevScheduledTasks) =>
      prevScheduledTasks.map((task) => {
        const { days, hours, minutes, seconds, total } = calculateTimeRemaining(
          task.dateTime.toDate()
        );
        return {
          ...task,
          countdown: { days, hours, minutes, seconds, total },
        };
      })
    );
  };

  useEffect(() => {
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [tasks]);

  const updateTodayTasks = (newTodayTaskReferences) => {
    const updatedTodayTasks = tasks.filter((task) =>
      newTodayTaskReferences.includes(task.id)
    );
    setTodayTasks(updatedTodayTasks);
  };

  const handleDeleteClick = (taskId) => {
    setSelectedTask(taskId);
  };

  const handleConfirmDelete = async () => {
    if (selectedTask) {
      console.log("Deleting task with ID:", selectedTask);
      try {
        const taskRef = doc(collection(fireDB, "tasks"), selectedTask);
        await deleteDoc(taskRef);
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== selectedTask)
        );
        console.log("Task deleted successfully.");
      } catch (error) {
        console.error("Error deleting task: ", error);
      } finally {
        setSelectedTask(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setSelectedTask(null);
  };

  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  const getPaginatedTasks = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return tasks.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const hasMoreTasks = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return tasks.length > endIndex;
  };

  return {
    tasks: allTasks,
    todayTasks,
    scheduledTasks,
    completedTasks,
    loading,
    selectedTask,
    updateTodayTasks,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    calculateTimeRemaining,
    fetchTasks,
    updateCountdown,
    currentPage,
    setCurrentPage,
    totalPages,
    handlePageChange,
    handleNextPage,
    handlePrevPage,
    getPaginatedTasks,
    hasMoreTasks,
    selectedTaskDetails,
    fetchedTaskDetails,
  };
};

export default useTask;
