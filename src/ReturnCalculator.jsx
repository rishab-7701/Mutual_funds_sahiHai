// // src/ReturnCalculator.jsx
// import React, { useState } from 'react';
// import { DatePicker, Button } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import './ReturnCalculator.css';

// const { RangePicker } = DatePicker;

// const ReturnCalculator = ({ schemeCode }) => {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [initialNAV, setInitialNAV] = useState(null);
//   const [finalNAV, setFinalNAV] = useState(null);
//   const [returnPercentage, setReturnPercentage] = useState(null);

//   const handleDateChange = (dates) => {
//     if (dates) {
//       const [start, end] = dates;
//       setStartDate(start);
//       setEndDate(end);
//     } else {
//       setStartDate(null);
//       setEndDate(null);
//     }
//   };

//   const calculateReturn = async () => {
//     if (!startDate || !endDate) return;

//     const formatDate = (date) => moment(date).format('YYYY-MM-DD');
//     const start = formatDate(startDate);
//     const end = formatDate(endDate);

//     try {
//         const response = await axios.get(`https://api.mfapi.in/mf/${schemeCode}`);
//         const fundData = response.data.data;
//         console.log(response.data.data);
    
//         let startNAV, endNAV;
    
//         for (let i = 0; i < fundData.length; i++) {
//             if (fundData[i].date === start) {
//                 startNAV = fundData[i].nav;
//             }
//             if (fundData[i].date === end) {
//                 endNAV = fundData[i].nav;
//             }
//         }
    
//         console.log(`Start NAV: ${startNAV}`);
//         console.log(`End NAV: ${endNAV}`);
//     } catch (error) {
//         console.error(error);
//     }
// }
    

//   return (
//     <div className="return-calculator">
//       <h2>Return Calculator</h2>
//       <RangePicker onChange={handleDateChange} />
//       <Button type="primary" onClick={calculateReturn}>Calculate Return</Button>
//       {returnPercentage !== null && (
//         <div className="result-section">
//           <p>Initial NAV: {initialNAV}</p>
//           <p>Final NAV: {finalNAV}</p>
//           <p>Return Percentage: {returnPercentage}%</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReturnCalculator;



// src/ReturnCalculator.jsx
// import React, { useState, useEffect } from 'react';
// import { DatePicker, Table, Button, InputNumber } from 'antd';
// import axios from 'axios';
// import moment from 'moment';
// import './ReturnCalculator.css';

// const { RangePicker } = DatePicker;

// const ReturnCalculator = () => {
//   const [fundData, setFundData] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [initialNAV, setInitialNAV] = useState(null);
//   const [finalNAV, setFinalNAV] = useState(null);
//   const [returnPercentage, setReturnPercentage] = useState(null);
//   const [schemeCode, setSchemeCode] = useState(135797); // Default scheme code

//   useEffect(() => {
//     if (schemeCode) {
//       axios.get(`https://api.mfapi.in/mf/${schemeCode}`)
//         .then(response => {
//           setFundData(response.data.data);
//         })
//         .catch(error => {
//           console.error('Error fetching fund data:', error);
//         });
//     }
//   }, [schemeCode]);

//   const handleDateChange = (dates) => {
//     if (dates) {
//       const [start, end] = dates;
//       setStartDate(start);
//       setEndDate(end);
//     } else {
//       setStartDate(null);
//       setEndDate(null);
//     }
//   };

//   const calculateReturn = () => {
//     if (!startDate || !endDate || !fundData.length) return;

//     const formatDate = (date) => moment(date).format('YYYY-MM-DD');
//     const startNAV = fundData.find(item => item.date === formatDate(startDate))?.nav;
//     const endNAV = fundData.find(item => item.date === formatDate(endDate))?.nav;

//     if (startNAV && endNAV) {
//       setInitialNAV(startNAV);
//       setFinalNAV(endNAV);
//       const percentageReturn = ((endNAV - startNAV) / startNAV) * 100;
//       setReturnPercentage(percentageReturn.toFixed(2));
//     } else {
//       alert('NAV data not available for selected dates');
//     }
//   };

//   return (
//     <div className="return-calculator">
//       <h2>Mutual Fund Return Calculator</h2>
//       <div className="input-section">
//         <RangePicker onChange={handleDateChange} />
//         <InputNumber
//           placeholder="Enter Scheme Code"
//           value={schemeCode}
//           onChange={(value) => setSchemeCode(value)}
//         />
//         <Button type="primary" onClick={calculateReturn}>Calculate Return</Button>
//       </div>
//       {returnPercentage !== null && (
//         <div className="result-section">
//           <p>Initial NAV: {initialNAV}</p>
//           <p>Final NAV: {finalNAV}</p>
//           <p>Return Percentage: {returnPercentage}%</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReturnCalculator;

































// src/ReturnCalculator.jsx
import React, { useState, useEffect } from 'react';

import { DatePicker, Table, InputNumber } from 'antd';
import { AppBar, Toolbar, Typography, Button, Box, Card, CardContent, Grid, Container, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import './ReturnCalculator.css';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const { RangePicker } = DatePicker; 

const theme = createTheme({
    palette: {
      primary: {
        main: '#431C4E',
      },
      secondary: {
        main: '#f50057',
      },
    },
    typography: {
      h4: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 500,
      },
    },
  });

const ReturnCalculator = ({schemeCode}) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [initialNAV, setInitialNAV] = useState(null);
    const [finalNAV, setFinalNAV] = useState(null);
    const [returnPercentage, setReturnPercentage] = useState(null);

  const handleDateChange = (dates) => {
    if (dates) {
      const [start, end] = dates;
      setStartDate(start);
      console.log(startDate);
      setEndDate(end);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const calculateReturn = async() => {
    if (!startDate || !endDate) return;

    const formatDate = (date) => moment(date).format('DD-MM-YYYY');
    console.log(startDate);
    console.log(endDate);
    const startformattedDate = formatDate(startDate.$d);
    console.log(startformattedDate);

    const endformattedDate = formatDate(endDate.$d);
    console.log(endformattedDate);

    try {
        const response = await axios.get(`https://api.mfapi.in/mf/${schemeCode}`);
        const fundData = response.data.data;
        console.log(fundData);
        let startNAV = null;
        let endNAV = null;
        for (let i = 0; i < fundData.length; i++) {
          if (fundData[i].date === startformattedDate) {
            startNAV = fundData[i].nav;
          }
          if (fundData[i].date === endformattedDate) {
            endNAV = fundData[i].nav;
          }
        }

        console.log(startNAV);
        console.log(endNAV);
  
        if (startNAV!=null && endNAV!=null) {
            setInitialNAV(startNAV);
            setFinalNAV(endNAV);
            const percentageReturn = ((endNAV - startNAV) / startNAV) * 100;
            setReturnPercentage(percentageReturn.toFixed(2));
        } else {
          alert('NAV data not available for selected dates');
        }
      } catch (error) {
        console.error('Error fetching NAV data:', error);
      }
    };

   

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mutual Fund Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Mutual Fund Return Calculator
            </Typography>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Select Date Range
                </Typography>
                <RangePicker onChange={handleDateChange} style={{ width: '100%' }} />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={calculateReturn}>
                  Calculate Return
                </Button>
              </Grid>
            </Grid>
            {returnPercentage !== null && (
              <Box mt={4}>
                <Typography variant="h6">
                  <strong>Initial NAV:</strong> {initialNAV}
                </Typography>
                <Typography variant="h6">
                  <strong>Final NAV:</strong> {finalNAV}
                </Typography>
                <Typography variant="h6" style={{display: 'inline-flex',alignItems:'center'}}>
                    <strong>Return Percentage:</strong> {returnPercentage}%
                    {returnPercentage > 0 ? (
                        <ArrowUpwardIcon style={{ color: 'green', marginLeft: 5}} />
                    ) : (
                        <ArrowDownwardIcon style={{ color: 'red', marginLeft: 5 }} />
                    )}
                  </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default ReturnCalculator;


// src/ReturnCalculator.jsx