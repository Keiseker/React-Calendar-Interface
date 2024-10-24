import * as React from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import colors from '../colors';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';

const AuthDialog = ({ open, onClose, onLoginSuccess}) => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [isLoginMode, setIsLoginMode] = useState(true); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // useEffect для сброса состояния при открытии диалога
  useEffect(() => {
    if (open) {
      setEmail('');
      setPassword('');
      setError('');
      setMessage('');
    }
  }, [open]);

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://localhost:7076/api/User/Register', {
        email: email,
        password: password
      });
      setMessage(`Регистрация прошла успешно!`);
    } catch (error) {
      handleError(error);
    }
  };

  const handleLogin = async () => {
    
    try {
      const response = await axios.post('https://localhost:7076/api/User/Login', {
        email: email,
        password: password
      });
      const uid = response.data; // Поскольку сервер возвращает строку, просто присваиваем ее переменной
      if (uid) {
        localStorage.setItem('uid', uid); // Сохраняем uid в localStorage
        onLoginSuccess(); // Успешный вход
      } else {
        console.error('UID не найден');
      }
  
      onClose(); // Закрываем диалог
    } catch (error) {
      // Обработка ошибок
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message || 'Неверная почта или пароль');
      } else {
        setError('Невозможно войти');
      }
    }
  };
  

  const handleError = (error) => {
    if (error.response) {
      if (error.response.status === 400) {
        setError(error.response.data.message || 'Неверная почта или пароль');
      } else if (error.response.status === 500) {
        setError('Ошибка сервера. Попробуйте позже.');
      } else {
        setError('Произошла ошибка: ' + error.response.status);
      }
    } else if (error.request) {
      setError('Сервер не отвечает. Проверьте ваше интернет-соединение.');
    } else {
      setError('Произошла ошибка при отправке запроса: ' + error.message);
    }
  };

  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
    setError('');
    setMessage('');
    setEmail(''); 
    setPassword('');
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle fontWeight="600" sx={{ color: colors.primary }}>
        {isLoginMode ? 'Войти' : 'Регистрация'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={email} // Связываем значение
              onChange={(e) => setEmail(e.target.value)} 
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& input': { color: colors.textAdd },
                  '&.Mui-focused fieldset': { borderColor: colors.primary },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: colors.primary,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Пароль"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              value={password} // Связываем значение
              onChange={(e) => setPassword(e.target.value)} 
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end" aria-label="toggle password visibility">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& input': { color: colors.textAdd },
                  '&.Mui-focused fieldset': { borderColor: colors.primary },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: colors.primary,
                },
              }}
            />
          </Grid>
          {!isLoginMode && (
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Подтвердите пароль"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                value={password} // Привязываем значение
                onChange={(e) => setPassword(e.target.value)} 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowConfirmPassword} edge="end" aria-label="toggle confirm password visibility">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& input': { color: colors.textAdd },
                    '&.Mui-focused fieldset': { borderColor: colors.primary },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: colors.primary,
                  },
                }}
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ minHeight: '40px', marginBottom: '8px', textAlign: 'center' }}>
          {error && <p style={{ color: colors.error, margin: 0 }}>{error}</p>}
          {message && <p style={{ color: colors.primary, margin: 0 }}>{message}</p>}
        </div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.primary,
            width: '80%',
            padding: '12px',
            fontSize: '16px',
          }}
          onClick={isLoginMode ? handleLogin : handleRegister}
        >
          {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
        </Button>
      </DialogActions>
      <DialogActions>
        <Button onClick={toggleMode} sx={{ margin: 'auto', color: colors.primary }}>
          {isLoginMode ? 'Нет аккаунта? Регистрация' : 'Есть аккаунт? Войти'}
        </Button>
        
      </DialogActions>
    </Dialog>
  );
};

export default AuthDialog;
