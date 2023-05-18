import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar  } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [invoices, setInvoices] = useState([]);

  const columns = [
    { field: "id",
     headerName: "ID",
     flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "contact_no",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.total_amount}
        </Typography>
      ),
    },
    {
      field: "createOrderDate",
      headerName: "Date",
      flex: 1,
    },
  ];

  useEffect(() => {
    axios.get("http://localhost:8081/api/v1/getAllOrder").then((response) => {
      setInvoices(response.data);
      console.log(setInvoices);
     
    });
  }, []);

  return (
    <Box m="20px">
    <Header
      title="CONTACTS"
      subtitle="List of Contacts for Future Reference"
    />
    <Box
      m="40px 0 0 0"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.grey[100]} !important`,
        },
      }}
    >
      <DataGrid checkboxSelection
        rows={invoices}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  </Box>
  );
};

export default Invoices;
