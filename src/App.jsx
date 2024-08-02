import PaymentForm from './components/PaymentForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';


const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box  component="section">
        <h1>Payment Application</h1>
        <Box display={"flex"} justifyContent={"center"}> 
        <PaymentForm />
        </Box>
      
      </Box>
    </ThemeProvider>
  );
}

export default App;