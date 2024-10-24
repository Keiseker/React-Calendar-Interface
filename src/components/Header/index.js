import React, { useState, useEffect } from 'react';
import colors from '../colors';
import AuthDialog from '../AuthDialog';
import AccountDialog from '../AccountDialog';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ today, prevHandler, todayHandler, nextHandler }) => {
  const [openAuth, setOpenAuth] = useState(false); // Состояние для диалога авторизации
  const [openAccountDialog, setAccountDialog] = useState(false); // Состояние для диалога профиля
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние для проверки авторизации

  useEffect(() => {
    // Проверяем, есть ли данные пользователя в localStorage при загрузке компонента
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsLoggedIn(true); // Устанавливаем статус авторизации
    }
  }, []);

  const handleClickOpenAuth = () => {
    setOpenAuth(true);
  };

  const handleCloseAuth = () => {
    setOpenAuth(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Устанавливаем статус авторизации
    setOpenAuth(false); // Закрываем диалог авторизации
    // Сохраняем данные пользователя в localStorage
    localStorage.setItem('userData', JSON.stringify({ loggedIn: true })); // Добавьте сюда нужные данные
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Сбрасываем статус авторизации
    setAccountDialog(false); // Закрываем диалог профиля
    localStorage.removeItem('userData'); // Удаляем данные пользователя
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: colors.primary }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClickOpenAuth} // Открытие диалога авторизации
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ marginRight: 4 }}>
              {/* Дата */}
            </Typography>
          </Box>

          <Button sx={{ marginLeft: 4 }} color="inherit" onClick={isLoggedIn ? () => setAccountDialog(true) : handleClickOpenAuth}>
            {isLoggedIn ? 'Профиль' : 'Войти'}
          </Button>
        </Toolbar>
      </AppBar>

      {/* Диалог авторизации */}
      <AuthDialog open={openAuth} onClose={handleCloseAuth} onLoginSuccess={handleLoginSuccess} />

      {/* Диалог профиля */}
      <AccountDialog open={openAccountDialog} onClose={() => setAccountDialog(false)} onLogout={handleLogout} />
    </Box>
  );
};

export default Header;
