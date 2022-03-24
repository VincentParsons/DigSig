import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./AdminUI.scss";
import Table from "./Table";

const AdminUI = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
            <div className="listTitle">Document History</div>
            <Table />
        </div>
      </div>
    </div>
  );
};

export default AdminUI;