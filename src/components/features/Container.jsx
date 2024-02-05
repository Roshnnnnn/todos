const Container = ({ item }) => {
  let containerClass =
    "bg-white h-[15rem] w-[15rem] flex justify-center items-center text-black";

  if (item === "Today") {
    containerClass += " bg-green-200";
  } else if (item === "Scheduled") {
    containerClass += " bg-blue-200";
  } else if (item === "Completed") {
    containerClass += " bg-gray-200";
  }

  return (
    <div className="">
      <div className={containerClass}>
        <div>{item}</div>
      </div>
    </div>
  );
};

export default Container;
