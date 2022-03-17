import { Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AboutPage from '../../features/about/AboutPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetailPage from '../../features/catalog/ProductDetails';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import Header from './Header';
import "react-toastify/dist/ReactToastify.css"
import ServerError from '../errors/ServerError';
import NotFound from '../errors/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const palletType = darkMode ? 'dark' : 'light';

  const darkTheme = createTheme({
    palette: {
      mode: palletType,
      background: {
        default: palletType === 'light' ? '#eaeaea' : '#121212',
      },
    },
  });

  const darkModeHandler = () => {
    setDarkMode((prevState) => !prevState);
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <ToastContainer position='bottom-right' hideProgressBar />
        <CssBaseline />
        <Header darkModeHandler={darkModeHandler} darkMode={darkMode} />
        <Container>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/catalog/:id' element={<ProductDetailPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/server-error' element={<ServerError />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
