import { Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const palletType = darkMode ? 'dark' : 'light';

  const darkTheme = createTheme({
    palette: {
      mode: palletType,
      background: {
        default: palletType ==='light' ? '#eaeaea': "#121212"
      }
    },
  });

  const darkModeHandler = () => {
    setDarkMode(prevState => !prevState)
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header darkModeHandler={darkModeHandler} />
        <Container>
          <Catalog />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
