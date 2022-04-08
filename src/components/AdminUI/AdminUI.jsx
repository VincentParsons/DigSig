import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./AdminUI.scss";
import Datatable from "./Datatable";

const AdminUI = () => {

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
          <Datatable />
        </div>
      </div>
    </div>
  );
};

export default AdminUI;