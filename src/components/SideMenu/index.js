import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const SideMenu = ({ menuOpen, toggleDrawer }) => {
  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: false,
    item3: false,
  });
  const [open, setOpen] = useState(false); // состояние для выпадающего списка

  // Обработка изменения состояния чекбокса
  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  // Обработка открытия/закрытия выпадающего списка
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      anchor="left"
      open={menuOpen}
      onClose={toggleDrawer(false)}
      sx={{
        '& .MuiDrawer-paper': {
          position: 'absolute',
          top: '64px', // Высота AppBar
          height: 'calc(100% - 64px)', // Остальная высота
          transition: 'none', // Убираем анимацию
        },
      }}
      BackdropProps={{
        invisible: true, // Убираем затемнение
      }}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={(event) => {
          // Убираем закрытие меню при клике на чекбоксы
          if (event.target.name) {
            event.stopPropagation();
          }
        }}
      >
        <Divider />

        {/* Выпадающий список с чекбоксами */}
        <List>
          <ListItem button onClick={handleClick}>
            <ListItemText primary="Мои календари" sx={{ fontSize: '14px' }} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={open} timeout="auto" unmountOnExit>
            {Object.keys(checkedItems).map((item) => (
              <ListItem key={item} sx={{ pl: 4 }}> {/* Отступ для вложенного списка */}
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checkedItems[item]}
                    onChange={handleCheckboxChange}
                    name={item}
                    inputProps={{ 'aria-labelledby': item }}
                  />
                </ListItemIcon>
                <ListItemText primary={item} sx={{ fontSize: '14px' }} />
              </ListItem>
            ))}
          </Collapse>
        </List>

        <Divider />

      </Box>
    </Drawer>
  );
};

export default SideMenu;
