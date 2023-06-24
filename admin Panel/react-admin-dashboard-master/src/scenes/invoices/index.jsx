import { Box, Typography ,Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridViewHeadlineIcon } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faList, faTrash } from '@fortawesome/free-solid-svg-icons';

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [invoices, setInvoices] = useState([]);
  const userName = localStorage.getItem('userName');  
  const columns = [
    {
      field: "id",
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
    {
      field: "prodcututems",
      headerName: "View",
      flex: 1,
      renderCell: (params) => (
        <span>
          <Link to={`/invoices/${params.row.id}`}>
            <FontAwesomeIcon icon={faList} style={{ color: 'White' }} />
          </Link>
        </span>
      ),
    },
    {
      field: "",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        if (userName === 'ROLE_ADMIN') {
          return null; // Hide the column for ROLE_ADMIN
          
        }
        
        return (
          <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <span style={{ marginRight: '8px' }}>Delete</span>
            <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteItem(params.row.id)} style={{ color: 'Red', width: '20px', height: '20px' }} />
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    getItem();
  }, []);


  const getItem = () => {
    fetch("http://localhost:8081/api/v1/getAllOrder", {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setInvoices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteItem = (itemId) => {
    setDeleteItemId(itemId);
    setIsDeleteDialogOpen(true);

  };
  const handleDeleteConfirmed = () => {
    fetch(`http://localhost:8081/api/v1/deleteOrder/${deleteItemId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        getItem();
        setIsDeleteDialogOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteCanceled = () => {
    // Close the delete dialog without performing the delete action
    setIsDeleteDialogOpen(false);
  };

  return (
    <Box m="20px">
      <Header
        title="Sales Order"
        subtitle="List of SaleOrder for Future Reference"
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

        <Dialog open={isDeleteDialogOpen} onClose={handleDeleteCanceled}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>Are you sure you want to delete?</DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirmed} color="error">Yes</Button>
            <Button onClick={handleDeleteCanceled} color="primary">No</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Invoices;
