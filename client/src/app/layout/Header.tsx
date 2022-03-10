import {
  AppBar,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';

interface Props {
  darkModeHandler: () => void;
}

const Header = ({ darkModeHandler }: Props) => {
  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant='h6'>RE-STORE</Typography>
        <Switch onChange={darkModeHandler} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
