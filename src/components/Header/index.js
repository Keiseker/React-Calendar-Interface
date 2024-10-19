import * as React from 'react';
import colors from '../colors';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Header = ({today,prevHandler,todayHandler,nextHandler}) => {
  const [alignment, setAlignment] = React.useState('left');
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: colors.primary }} position="static">
        <Toolbar>
          {/* бровки */}
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" >
            <MenuIcon />
          </IconButton>
          {/* надпись */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{marginRight: 4}}>
            {capitalize(today.format('MMMM'))} {today.format('YYYY')}
            </Typography>
          </Box>
          <Box sx={{marginRight: 4}}>
              {/* стрелочка влево */}
            <IconButton onClick={prevHandler} color="inherit" size="large" aria-label="menu" sx={{marginRight: 1}} >
              <KeyboardArrowLeftIcon/>
            </IconButton>
            <Button onClick={todayHandler} variant="contained" color={colors.primary} >Сегодня</Button>
            {/* стрелочка вправо */}
            <IconButton onClick={nextHandler} size="large"  color="inherit" aria-label="menu"sx={{marginLeft: 1}} >
              <KeyboardArrowRightIcon />
          </IconButton>
          </Box>
          
          <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} size="small"  aria-label="Small sizes">
            <ToggleButton value="left" color="inherit" aria-label="left aligned">
              <DateRangeOutlinedIcon/>
            </ToggleButton>
            <ToggleButton value="center" color="inherit" aria-label="centered">
              <TaskAltOutlinedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <Button sx ={{marginLeft: 4}}color="inherit">Войти</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;




