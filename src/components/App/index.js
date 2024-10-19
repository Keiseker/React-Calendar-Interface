import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from '../Header';
import CalendarGrid from '../CalendarGrid';
import moment from "moment"
import 'moment/locale/ru'; // Импортируйте русскую локализацию

const App = () => {
  // //неделя начинается с пн, а не с вс
  moment.updateLocale('en', {week:{dow:1}});
  moment.locale('ru'); // Установите локализацию на русский
  // const today = moment();
  const [today,setToday] = useState(moment());
  // //дата начала отоборажаемого месяца календаря
  const startDay = today.clone().startOf('month').startOf('week');

  const prevHandler = () => setToday(prev => prev.clone().subtract(1,'month'));
  const todayHandler = () => setToday(moment());
  const nextHandler = () => setToday(prev => prev.clone().add(1,'month'));
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'red',
          height: '100vh', // Высота на весь экран
          width: '100vw',  // Ширина на весь экран
        }}
      >
        {/* Header занимает фиксированную высоту */}
        <Header today = {today}
        prevHandler = {prevHandler}
        todayHandler = {todayHandler}
        nextHandler = {nextHandler}/>

        {/* Контейнер для календаря */}
        <Box
          sx={{
            flexGrow: 1,  // Календарь растягивается на оставшуюся высоту
            overflow: 'hidden',  // Отключаем скролл
            
          }}
        >
          <CalendarGrid startDay = {startDay} today = {today}/>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default App;
