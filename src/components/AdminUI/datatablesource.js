export const userColumns = [
    { field: "id", headerName: "Document ID", width: 70 },
    {
      field: "studentname",
      headerName: "Student Name",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.row.studentname}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];
  
  //temporary data
  export const userRows = [
    {
      id: 1,
      studentname: "Vincent Parsons",
      status: "Approved",
      email: "vwparsons@eagles.usi.edu",
    },
    {
      id: 2,
      studentname: "Vincent Parsons",
      status: "Warning",
      email: "vwparsons@eagles.usi.edu",
    },
    {
      id: 3,
      studentname: "Vincent Parsons",
      status: "Denied",
      email: "vwparsons@eagles.usi.edu",
    },
    {
      id: 4,
      studentname: "Vincent Parsons",
      status: "Warning",
      email: "vwparsons@eagles.usi.edu",
    },
    {
      id: 5,
      studentname: "Vincent Parsons",
      status: "Approved",
      email: "vwparsons@eagles.usi.edu",
    },
    {
      id: 6,
      studentname: "Vincent Parsons",
      status: "Denied",
      email: "vwparsons@eagles.usi.edu",
    },
    {
      id: 7,
      studentname: "Vincent Parsons",
      status: "Approved",
      email: "vwparsons@eagles.usi.edu",
    },
    {
      id: 8,
      studentname: "Vincent Parsons",
      status: "Approved",
      email: "vwparsons@eagles.usi.edu",
    },
    {
      id: 9,
      studentname: "Vincent Parsons",
      status: "Approved",
      email: "vwparsons@eagles.usi.edu",
    },
    {
      id: 10,
      studentname: "Vincent Parsons",
      status: "Approved",
      email: "vwparsons@eagles.usi.edu",
    },
  
  ];