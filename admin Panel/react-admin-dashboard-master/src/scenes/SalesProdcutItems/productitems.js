import { Box } from "@mui/material";
import { DataGrid, GridToolbar} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../scenes/style/productitems.css";

const ProductItems = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [product, setproduct] = useState([]);
  const {id } = useParams();
  const orderid=Number(id);

  const columns = [
 
    { field: "pid",
     headerName: "Product ID",
     flex: 1,
    },
    {
      field: "title",
      headerName: "Product Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
        field: "imgpath",
        headerName: "Image ",
        flex: 1,
        renderCell: (params) => (
          <ImageCard imageUrl={params.value} alt="Product"  />
        ),
    },
    
  ];

  const ImageCard = ({ imageUrl}) => {
    return (
      <div className="image-card">
        <img src={imageUrl}  width={"50%"} height={"50%"} />
      </div>
    );
  };

//enhasment:==  id is hard coding 
useEffect(() => {
    
  let apiCall = `http://localhost:8081/api/v1/getOrder/${orderid}`;
  fetch(apiCall)
    .then(response => response.json())
    .then(data => {
      const rowsWithIds = data.map((row, index) => ({ id: index + 1, ...row }));
      console.log(data);
      setproduct(rowsWithIds);
    }) 

},[orderid]);

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
        rows={product}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        getRowHeight={(params) => 100}
      />
    </Box>
  </Box>
  );
};

export default ProductItems;
