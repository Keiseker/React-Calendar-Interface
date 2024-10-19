import * as React from 'react';
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
import { useState } from 'react';

const AuthDialog = ({ open, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // Для управления видимостью пароля
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Для управления видимостью подтверждения пароля

  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle fontWeight="600" sx={{color: colors.primary}}>
        {isLoginMode ? 'Войти' : 'Регистрация'}
        {/* Кнопка закрытия */}
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
              sx={{
                // Стили для поля ввода
                '& .MuiOutlinedInput-root': {
                  '& input': {
                    color: colors.textAdd, // Цвет текста внутри поля
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: colors.primary, // Цвет рамки при фокусе
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: colors.primary, // Цвет лейбла при фокусе
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Пароль"
              type={showPassword ? 'text' : 'password'} // Показать или скрыть пароль
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& input': {
                    color: colors.textAdd, // Цвет текста внутри поля
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: colors.primary, // Цвет рамки при фокусе
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: colors.primary, // Цвет лейбла при фокусе
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {!isLoginMode && (
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Подтвердите пароль"
                type={showConfirmPassword ? 'text' : 'password'} // Показать или скрыть подтверждение пароля
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& input': {
                      color: colors.textAdd, // Цвет текста внутри поля
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: colors.primary, // Цвет рамки при фокусе
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: colors.primary, // Цвет лейбла при фокусе
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                        aria-label="toggle confirm password visibility"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.primary,
            width: '80%', // Ширина кнопки
            padding: '12px', // Дополнительное пространство для кнопки
            fontSize: '16px', // Размер шрифта побольше
          }}
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
