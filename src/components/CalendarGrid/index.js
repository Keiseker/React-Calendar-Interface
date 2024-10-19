import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import colors from '../colors';

const CalendarGrid = ({ startDay, today }) => {
  const [cellHeight, setCellHeight] = useState(0);
  const totalDays = 35;
  const day = startDay.clone().subtract(1, 'day');
  
  // Массив отображаемых дней месяца
  const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());

  const isCurrentDay = (day) => moment().isSame(day, 'day');
  const isSelectedMonth = (day) => today.isSame(day, 'month');
  
  // Обновляем высоту ячеек при изменении размера окна
  useEffect(() => {
    const updateCellHeight = () => {
      const headerHeight = 64; // Фиксированная высота Header
      const viewportHeight = window.innerHeight;
      const availableHeight = viewportHeight - headerHeight;
      const newCellHeight = availableHeight / 5; // 5 строк
      setCellHeight(newCellHeight);
    };

    updateCellHeight();
    window.addEventListener('resize', updateCellHeight);

    // Чистим обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('resize', updateCellHeight);
    };
  }, []);

  return (
    <Box sx={{ height: '100%', backgroundColor:colors.primary }}>
      <Grid
        container
        spacing={0}
        sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          },
        }}
      >
        {daysArray.map((day, index) => (
          <Grid
            key={index}
            item
            xs={12 / 7}  // 7 колонок
            sx={{
              height: `${cellHeight}px`,  // Динамически рассчитываемая высота
              backgroundColor: isCurrentDay(day) ? colors.primary : 'white', // Цвет для текущего дня
              color: isCurrentDay(day) ? colors.textPrimary : 'black', // Цвет для текущего дня
              opacity: isSelectedMonth(day) ? 1 : 0.6,  // Прозрачность для дней, которые не относятся к выбранному месяцу
            }}
          >
            {/* Контент ячейки — отображение даты */}
            <Box sx={{ padding: 1 }}>
              {day.format('D')} {/* День месяца */}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CalendarGrid;
