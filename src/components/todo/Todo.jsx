import { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { collection, addDoc } from "firebase/firestore";
import { fireDB } from "../config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Todo = () => {
  const [open, setOpen] = useState(false);
  const [selectDate, setSelectDate] = useState(null);
  const [selectTime, setSelectTime] = useState(null);
  const [selectReminder, setSelectReminder] = useState("");
  const [selectTitle, setSelectTitle] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const userId = useSelector((state) => state.auth.userId);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleCategory = (e) => {
    setSelectCategory(e.target.value);
  };

  const handleReminder = (e) => {
    setSelectReminder(e.target.value);
  };

  const handleTime = (time) => {
    setSelectTime(time);
  };

  const handleTitle = (e) => {
    setSelectTitle(e.target.value);
  };

  const handleDate = (date) => {
    setSelectDate(date);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isTimePast = (time) => {
    const currentTime = new Date();
    return time < currentTime;
  };

  const handleSave = async () => {
    setFormSubmitted(true);

    if (
      !selectCategory ||
      !selectReminder ||
      !selectDate ||
      !selectTime ||
      !selectTitle
    ) {
      let errorMessage = "Please fill in all required fields: ";

      if (!selectCategory) errorMessage += "Category, ";
      if (!selectReminder) errorMessage += "Reminder, ";
      if (!selectDate) errorMessage += "Date, ";
      if (!selectTime) errorMessage += "Time, ";
      if (!selectTitle) errorMessage += "Title, ";

      toast.error(errorMessage.slice(0, -2));
      return;
    }

    const setSelectedDateTime = new Date(selectDate);
    setSelectedDateTime.setHours(selectTime.getHours());
    setSelectedDateTime.setMinutes(selectTime.getMinutes());

    if (isToday(setSelectedDateTime) && isTimePast(setSelectedDateTime)) {
      toast.error("Selected time has already passed for today.");
      return;
    }

    try {
      const taskData = {
        userId,
        category: selectCategory,
        title: selectTitle,
        reminder: selectReminder,
        dateTime: setSelectedDateTime,
      };

      await addDoc(collection(fireDB, "tasks"), taskData);

      toast.success("Task added successfully.");

      setSelectCategory("");
      setSelectReminder("");
      setSelectDate(null);
      setSelectTime(null);
      setSelectTitle("");
      setOpen(false);
    } catch (error) {
      console.error("Error adding task: ", error);
      toast.error("Error adding task. Please try again.");
    }
  };

  const handleCancel = () => {
    setSelectCategory("");
    setSelectReminder("");
    setSelectDate(null);
    setSelectTime(null);
    setSelectTitle("");
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-end mt-4 mx-4">
        <button
          onClick={handleClick}
          className={`rounded-full h-[4rem] w-[4rem] sm:w-[3rem] sm:h-[3rem] flex items-center justify-center bg-${
            open ? "red" : "green"
          }-500 text-white transition-colors`}
        >
          {open ? (
            <AiOutlineClose className="text-2xl" />
          ) : (
            <AiOutlinePlus className="text-2xl" />
          )}
        </button>
        {open && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-md">
            <div className="p-4 sm:p-8 rounded-md animate-fade-in w-full sm:max-w-md">
              <select
                className={`w-full p-2 mb-2 rounded-md border ${
                  formSubmitted && !selectCategory ? "border-red-500" : ""
                }`}
                value={selectCategory}
                onChange={handleCategory}
              >
                <option value="" hidden>
                  Category
                </option>
                <option value="Gym">Gym</option>
                <option value="Work">Work</option>
                <option value="Birthday">Birthday</option>
              </select>

              <input
                required
                type="text"
                placeholder="Title..."
                value={selectTitle}
                onChange={handleTitle}
                className={`w-full p-2 mb-2 rounded-md border border-gray-300 ${
                  formSubmitted && !selectTitle ? "border-red-500" : ""
                }`}
              />

              <textarea
                required
                name=""
                id=""
                placeholder="Add your task..."
                value={selectReminder}
                onChange={handleReminder}
                className={`w-full p-2 mb-2 rounded-md border border-gray-300 ${
                  formSubmitted && !selectReminder ? "border-red-500" : ""
                }`}
              />

              <div>
                <DatePicker
                  required
                  selected={selectDate}
                  onChange={handleDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date"
                  className={
                    "w-full p-2 mb-2 rounded-md border datepicker focus:z-10 "
                  }
                  popperPlacement="top-end"
                  minDate={new Date()}
                />
              </div>
              <div>
                <DatePicker
                  required
                  selected={selectTime}
                  onChange={handleTime}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={5}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select time"
                  className={
                    "w-full p-2 mb-2 rounded-md border timepicker focus:z-10"
                  }
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSave}
                  className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Save
                </button>
                <button
                  className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Todo;
