import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "./datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import Popup from "./Popup";

const sharedHandler = () => {
  alert('Success, document has been shared!');
}

const Datatable = () => {
  const [buttonPopup, setButtonPopup] = useState(false);

  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/editor" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <Link onClick={() => setButtonPopup(true)} style={{ textDecoration: "none" }}>
              <div className="shareButton">Share</div>
            </Link>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <h3>Share Document</h3>
              <form onSubmit={sharedHandler} action="http://127.0.0.1:5000/send-email" method="post">
                  <input className="input-share"
                    placeholder="Email"
                    type="email"
                    name="email"
                    id="email"
                  />
                  <input className="input-share"
                    placeholder="Document ID"
                    type="text"
                    name="doc_id"
                    id="doc_id"
                  />
                  <input className="input-share"
                    placeholder="Student Name"
                    type="text"
                    name="stud_name"
                    id="stud_name"
                  />
                  <button type="submit" className="share-button">
                    Share
                  </button>
              </form>
            </Popup>
          </div>
        );
      },
    },
  ];

  const usersColumn = [
    {
      field: "users",
      headerName: "Users",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/editor" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <Link onClick={() => setButtonPopup(true)} style={{ textDecoration: "none" }}>
              <div className="shareButton">Share</div>
            </Link>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <h3>Share Document</h3>
              <form onSubmit={sharedHandler} action="http://127.0.0.1:5000/send-email" method="post">
                  <input className="input-share"
                    placeholder="Email"
                    type="email"
                    name="email"
                    id="email"
                  />
                  <input className="input-share"
                    placeholder="Document ID"
                    type="text"
                    name="doc_id"
                    id="doc_id"
                  />
                  <input className="input-share"
                    placeholder="Student Name"
                    type="text"
                    name="stud_name"
                    id="stud_name"
                  />
                  <button type="submit" className="share-button">
                    Share
                  </button>
              </form>
            </Popup>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Document History
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn, usersColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;