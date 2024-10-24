import React, { useEffect, useState } from 'react';
import colors from '../colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
const uid = localStorage.getItem('uid');
const AccountDialog = ({ open, onClose, onLogout }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      const uid = localStorage.getItem('uid'); // Получаем uid
      if (uid) {
        const fetchUserInfo = async () => {
          try {
            const response = await axios.get(`https://localhost:7076/api/User/GetInfo?uid=${uid}`);
            setEmail(response.data.email);
          } catch (err) {
            setError('Ошибка при получении информации о пользователе');
          } finally {
            setLoading(false);
          }
        };
        fetchUserInfo();
      } else {
        console.error('UID не найден');
      }
    }
  }, [open]);

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`https://localhost:7076/api/user/Delete?uid=${uid}`); // Ваш эндпоинт для удаления аккаунта
      
      onLogout(); // Вызываем функцию выхода после удаления
      onClose(); // Закрываем диалоговое окно
    } catch (err) {
      setError('Ошибка при удалении аккаунта');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle fontWeight="600" sx={{color: colors.primary, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Ваш профиль
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Загрузка...
          </Typography>
        ) : error ? (
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'red' }}>
            {error}
          </Typography>
        ) : (
          <Typography variant="body1" fontSize="18px" sx={{ textAlign: 'center' }}>
            Ваша почта: {email}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center'}}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.primary,
            width: '80%',
            padding: '12px',
            fontSize: '16px',
          }}
          onClick={onLogout}>
          Выход
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.error,
            width: '80%',
            padding: '12px',
            fontSize: '16px',
          }}
          onClick={handleDeleteAccount}>
          Удалить аккаунт
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountDialog;
