import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  return (
    <div>
      <nav className="">
        <Navbar />
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
