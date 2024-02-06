import { useEffect } from "react";
import useTask from "../hook/useTask";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import NoTask from "./NoTask";
import ProgressBarLoader from "../ProgressBar/ProgressBarLoader";

const AllTask = () => {
  const {
    loading,
    selectedTask,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    totalPages,
    fetchTasks,
    currentPage,
    handlePageChange,
    handleNextPage,
    handlePrevPage,
    getPaginatedTasks,
  } = useTask();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="bg-slate-500 min-h-screen text-black">
      <Navbar />
      {loading && <ProgressBarLoader />}
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center">
          <h1 className="text-4xl my-4">All Tasks</h1>
        </div>

        {getPaginatedTasks().length === 0 ? (
          <NoTask />
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[4rem] m-4">
            {getPaginatedTasks().map((task, index) => (
              <div key={index}>
                <li className="bg-white p-6 rounded-md shadow-md flex flex-col justify-between mb-8 md:mb-0">
                  <div className="mb-4">
                    <span className="font-bold text-lg">Category:</span>
                    <span className="text-base ml-2">{task.category}</span>
                  </div>
                  <div className="mb-4">
                    <span className="font-bold text-lg">Title:</span>
                    <span className="text-base ml-2">{task.title}</span>
                  </div>
                  <div className="mb-4">
                    <span className="font-bold text-lg mb-2">Date:</span>
                    <span>{task.dateTime.toDate().toLocaleDateString()}</span>
                  </div>
                  <div className="mb-4">
                    <span className="font-bold text-lg mb-2">Time:</span>
                    <span>{task.dateTime.toDate().toLocaleTimeString()}</span>
                  </div>
                  <div className="mb-4">
                    <div className="font-bold text-lg mb-2">Reminder:</div>
                    {task.reminder.length > 30
                      ? `${task.reminder.slice(0, 25)}...`
                      : task.reminder}
                  </div>
                  <div className="mb-4">
                    <div className="font-bold text-lg mb-2">
                      Time Remaining:
                    </div>
                    {task.countdown ? (
                      <span>
                        {task.countdown.days > 0 &&
                          `${task.countdown.days} days, `}
                        {task.countdown.hours > 0 &&
                          `${task.countdown.hours} hours, `}
                        {task.countdown.minutes > 0 &&
                          `${task.countdown.minutes} minutes, `}
                        {task.countdown.seconds > 0 &&
                          `${task.countdown.seconds} seconds`}
                        {task.countdown.total <= 0 && "Time's Up"}
                      </span>
                    ) : (
                      "Calculating..."
                    )}
                  </div>
                </li>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDeleteClick(task.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </ul>
        )}
        <div className="flex justify-center">
          <div className="flex space-x-4">
            <button
              onClick={handlePrevPage}
              className={`px-3 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-800 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-2 rounded-md ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              className={`px-3 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-800 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md">
            <p className="mb-4 text-lg font-bold">
              Are you sure you want to delete this task?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AllTask;
