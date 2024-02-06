import { Link } from "react-router-dom";
import Container from "../features/Container";
import Todo from "../todo/Todo";
import Footer from "../footer/Footer";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const items = [
    { name: "Today", link: "/today-task" },
    { name: "Scheduled", link: "/scheduled-task" },
    { name: "Completed", link: "/completed-task" },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col bg-slate-500">
        <div className="p-2">
          <Todo />
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center p-4">
          {items.map((item) => (
            <div key={item.name} className="mb-4 md:mb-0 md:mr-4 mx-[4rem]">
              <Link to={item.link}>
                <Container item={item.name} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
