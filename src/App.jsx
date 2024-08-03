import PaymentForm from './components/PaymentForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PaymentError from './components/PaymentError';
import PaymentServerError from './components/PaymentServerError';


const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box component="section">
        <h1>Payment Application</h1>
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <PaymentForm />
          <PaymentError />
          <PaymentServerError />
        </Box>

      </Box>
    </ThemeProvider>
  );
}

export default App;