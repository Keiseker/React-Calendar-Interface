import React, { useState } from 'react';
import colors from '../colors';
import AuthDialog from '../AuthDialog';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import SideMenu from '../SideMenu'; // Импорт бокового меню

const Header = ({ today, prevHandler, todayHandler, nextHandler }) => {
  const [alignment, setAlignment] = useState('left');
  const [open, setOpen] = useState(false); // Состояние для диалога авторизации
  const [menuOpen, setMenuOpen] = useState(false); // Состояние для бокового меню

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // Открытие и закрытие диалога
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Открытие и закрытие меню
  const toggleDrawer = (open) => () => {
    setMenuOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: colors.primary }} position="static">
        <Toolbar>
          {/* Меню */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Название месяца и года */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ marginRight: 4 }}>
              {capitalize(today.format('MMMM'))} {today.format('YYYY')}
            </Typography>
          </Box>

          {/* Кнопки навигации по календарю */}
          <Box sx={{ marginRight: 4 }}>
            <IconButton
              onClick={prevHandler}
              color="inherit"
              size="large"
              aria-label="menu"
              sx={{ marginRight: 1 }}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <Button onClick={todayHandler} variant="contained" color={colors.primary}>
              Сегодня
            </Button>
            <IconButton
              onClick={nextHandler}
              size="large"
              color="inherit"
              aria-label="menu"
              sx={{ marginLeft: 1 }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>

          {/* Переключение между видами */}
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            size="small"
            aria-label="Small sizes"
          >
            <ToggleButton value="left" color="inherit" aria-label="left aligned">
              <DateRangeOutlinedIcon />
            </ToggleButton>
            <ToggleButton value="center" color="inherit" aria-label="centered">
              <TaskAltOutlinedIcon />
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Кнопка "Войти" */}
          <Button sx={{ marginLeft: 4 }} color="inherit" onClick={handleClickOpen}>
            Войти
          </Button>
        </Toolbar>
      </AppBar>

      {/* Подключение диалога авторизации */}
      <AuthDialog open={open} onClose={handleClose} />

      {/* Подключение бокового меню */}
      <SideMenu menuOpen={menuOpen} toggleDrawer={toggleDrawer} />
    </Box>
  );
};

export default Header;
