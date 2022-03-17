import { Button, Container, Divider, Paper, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const ServerError = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as any;

  return (
    <Container component={Paper}>
      {state?.err ? (
        <>
          <Typography variant='h3' color='error' gutterBottom paddingTop={2}>
            {state.err.title}
          </Typography>
          <Divider />
          <Typography>{state.err.detail || 'Internal server error'}</Typography>
        </>
      ) : (
        <Typography variant='h5' gutterBottom>
          Server error
        </Typography>
      )}
      <Button variant='outlined' sx={{mt: 2, mb: 2}} onClick={() => navigate('/catalog')} >Go back to the store</Button>
    </Container>
  );
};

export default ServerError;
