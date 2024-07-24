// ``import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//     AppBar,
//     Toolbar,
//     Typography,
//     Container,
//     TextField,
//     Button,
//     Card,
//     CardContent,
//     Grid,
//     Box,
//     Snackbar,
//     CircularProgress,
//     Backdrop
//   } from '@mui/material';
//   import { Alert } from '@mui/lab';
// import {Pagination, Table} from 'antd';
// import './FundsTable.css';
// import ReturnCalculator from './ReturnCalculator';

// const FundsTable = () => {
//     const [funds, setFunds] = useState([]);
//     const [page, setPage] = useState(1);
//     const itemsPerPage = 10;
//     const [totalPages, setTotalPages] = useState(0);
//     const[schemeCode,setSchemeCode] = useState('');
//     const[searchResult,setSearchResult] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState('success');


//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get('https://api.mfapi.in/mf');
//                 const mutualFunds = response.data;
//                 setTotalPages(Math.ceil(mutualFunds.length / itemsPerPage));
//                 const startIndex = (page - 1) * itemsPerPage;
//                 const endIndex = startIndex + itemsPerPage;
//                 setFunds(mutualFunds.slice(startIndex, endIndex));
//                 console.log((mutualFunds.slice(startIndex, endIndex)));
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching mutual funds:', error);
//                 setLoading(false);
//                 setSnackbarMessage('Error fetching mutual funds');
//                 setSnackbarSeverity('error');
//                 setSnackbarOpen(true);  
//             }
//         };
//         fetchData();
//     }, [page]);

//     const columns = [
//        {
//         title:'Scheme Code',
//         dataIndex:'schemeCode',
//         key:'schemeCode'
//        },
//        {
//         title:'Fund Name',
//         dataIndex:'schemeName',
//         key:'schemeName'
//        }
//     ];
    
//     const handlePageChange = (page) => {
//         setPage(page);
//     };
    
//     const handleRowClick = async (record) => {
//         //   console.log(record);
//         try {
//           setLoading(true);
//           const response = await axios.get(`https://api.mfapi.in/mf/${record.schemeCode}/latest`);
//           const fetched_data  = response.data;
//           console.log(fetched_data);
//           setLoading(false);
//           setSnackbarMessage('Data fetched successfully');
//           setSnackbarSeverity('success');
//           setSnackbarOpen(true);
//         } catch (error) {
//             console.error('Error fetching data for scheme:', error);
//             setLoading(false);
//             setSnackbarMessage('Error fetching data for scheme');
//             setSnackbarSeverity('error');
//             setSnackbarOpen(true);
//         }
          
//     }
   
//     const handleSearch = async() => {
//         setLoading(true);
//       try {
//         const response = await axios.get(`https://api.mfapi.in/mf/${schemeCode}`);
//         setSearchResult(response.data);
//         console.log(response.data);
//         setLoading(false);
//         setSnackbarMessage('Search completed successfully');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);

//       } catch (error) {
//            console.error("Error fetching mutual fund by scheme code:",error);
//            setSearchResult(null);
//            setLoading(false);
//            setSnackbarMessage('Error fetching mutual fund by scheme code');
//            setSnackbarSeverity('error');
//            setSnackbarOpen(true);
//     }
// };

//  const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
// };
//     return (
        

//         <div className='Funds-table'>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6">
//             Mutual Funds Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Container>
//         <Box mt={4} mb={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h4" gutterBottom>
//                 Mutual Funds List
//               </Typography>
//               <Grid container spacing={2} alignItems="center">
//                 <Grid item xs={9}>
//                   <TextField
//                     label="Enter Scheme Code"
//                     variant="outlined"
//                     fullWidth
//                     value={schemeCode}
//                     onChange={(e) => setSchemeCode(e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={3}>
//                   <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
//                     Search
//                   </Button>
//                 </Grid>
//               </Grid>
//               {searchResult ? (
//                 <div className='search-result'>
//                   <Typography variant="h5" gutterBottom>
//                     Search Result
//                   </Typography>
//                   <Typography variant="body1"><strong>Scheme Code:</strong> {searchResult.meta.scheme_code}</Typography>
//                   <Typography variant="body1"><strong>Fund Name:</strong> {searchResult.meta.scheme_name}</Typography>
//                   <Typography variant="body1"><strong>Scheme Type:</strong> {searchResult.meta.scheme_type}</Typography>
//                   <Typography variant="body1"><strong>Scheme Category:</strong> {searchResult.meta.scheme_category}</Typography>
//                   <Typography variant="body1"><strong>NAV:</strong> {searchResult.data[0].nav}</Typography>
//                   <Typography variant="body1"><strong>Date:</strong> {searchResult.data[0].date}</Typography>
//                   <ReturnCalculator schemeCode={schemeCode} />
//                 </div>
//               ) : (
//                 <>
//                   <Table
//                     className='inner-table'
//                     dataSource={funds}
//                     columns={columns}
//                     pagination={false}
//                     rowKey="schemeCode"
//                     onRow={(record) => ({
//                       onClick: () => handleRowClick(record),
//                     })}
//                   />
//                   <Pagination
//                     current={page}
//                     total={totalPages * itemsPerPage}
//                     pageSize={itemsPerPage}
//                     onChange={handlePageChange}
//                     className='pagination'
//                   />
//                 </>
//               )}
//             </CardContent>
//           </Card>
//         </Box>
//       </Container>
//       <Backdrop open={loading} style={{ zIndex: 1000, color: '#fff' }}>
//         <CircularProgress color="inherit" />
//       </Backdrop>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//     );
// };

// export default FundsTable;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination } from 'antd';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  Snackbar,
  CircularProgress,
  Backdrop,
  Alert
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ReturnCalculator from './ReturnCalculator';

const useStyles = makeStyles((theme) => ({
  fundsTable: {
    padding: '20px',
    backgroundColor: '#277956',
    borderRadius: '8px',
    // width: '100%',
    margin: 'auto',
    alignSelf: 'start',
    alignItems: 'center',
  },
  header: {
    color: 'white',
  },
  innerTable: {
    padding: '10px',
    backgroundColor: 'rgb(238, 115, 99)',
    borderRadius: '12px',
  },
  pagination: {
    paddingTop: '12.5px',
    alignItems: 'center',
    justifyContent: 'center',
    columnWidth: '5px',
  },
  searchResult: {
    color: 'rgb(14, 1, 1)',
    padding: '10px 12.5px',
    borderRadius: '20px',
    backgroundColor: 'rgb(229, 152, 152)',
    textAlign: 'left',
  },
  date: {
    padding: '10px',
    fontSize: '2rem',
  },
}));

const FundsTable = () => {
  const classes = useStyles();
  const [funds, setFunds] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [schemeCode, setSchemeCode] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.mfapi.in/mf');
        const mutualFunds = response.data;
        setTotalPages(Math.ceil(mutualFunds.length / itemsPerPage));
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setFunds(mutualFunds.slice(startIndex, endIndex));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching mutual funds:', error);
        setLoading(false);
        setSnackbarMessage('Error fetching mutual funds');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    };
    fetchData();
  }, [page]);

  const columns = [
    {
      title: 'Scheme Code',
      dataIndex: 'schemeCode',
      key: 'schemeCode',
    //   render: (text,record)=>(
    //     <span style={{color:record.schemeCode>105000 ? 'red' : 'green'}}>
    //         {schemeCode}New
    //     </span>
    //   ),
    },
    {
      title: 'Fund Name',
      dataIndex: 'schemeName',
      key: 'schemeName',
    },
  ];

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleRowClick = async (record) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.mfapi.in/mf/${record.schemeCode}/latest`);
      const fetchedData = response.data;
      console.log(fetchedData);
      setLoading(false);
      setSnackbarMessage('Data fetched successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error fetching data for scheme:', error);
      setLoading(false);
      setSnackbarMessage('Error fetching data for scheme');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.mfapi.in/mf/${schemeCode}`);
      setSearchResult(response.data);
      setLoading(false);
      setSnackbarMessage('Search completed successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error fetching mutual fund by scheme code:', error);
      setSearchResult(null);
      setLoading(false);
      setSnackbarMessage('Error fetching mutual fund by scheme code');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className={classes.fundsTable}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.header}>
            Mutual Funds Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={4} mb={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Mutual Funds List
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                  <TextField
                    label="Enter Scheme Code"
                    variant="outlined"
                    fullWidth
                    value={schemeCode}
                    onChange={(e) => setSchemeCode(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
                    Search
                  </Button>
                </Grid>
              </Grid>
              {searchResult ? (
                <div className={classes.searchResult}>
                  <Typography variant="h5" gutterBottom>
                    Search Result
                  </Typography>
                  <Typography variant="body1"><strong>Scheme Code:</strong> {searchResult.meta.scheme_code}</Typography>
                  <Typography variant="body1"><strong>Fund Name:</strong> {searchResult.meta.scheme_name}</Typography>
                  <Typography variant="body1"><strong>Scheme Type:</strong> {searchResult.meta.scheme_type}</Typography>
                  <Typography variant="body1"><strong>Scheme Category:</strong> {searchResult.meta.scheme_category}</Typography>
                  <Typography variant="body1"><strong>NAV:</strong> {searchResult.data[0].nav}</Typography>
                  <Typography variant="body1"><strong>Date:</strong> {searchResult.data[0].date}</Typography>
                  <ReturnCalculator schemeCode={schemeCode} />
                </div>
              ) : (
                <>
                  <Table
                    className={classes.innerTable}
                    dataSource={funds}
                    columns={columns}
                    pagination={false}
                    rowKey="schemeCode"
                    onRow={(record) => ({
                      onClick: () => handleRowClick(record),
                    })}
                  />
                  <Pagination
                    current={page}
                    total={totalPages * itemsPerPage}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                    className={classes.pagination}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
      <Backdrop open={loading} style={{ zIndex: 1000, color: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FundsTable;
