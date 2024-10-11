import React, { useState } from 'react'
import moment from "moment"
import { Navigation } from '../Navigaton';
import { CalendarGrid } from '../CalendarGrid';
import { Header } from '../Header';
import 'moment/locale/ru'; // Импортируйте русскую локализацию



function App() {
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
    <div >
      <Header/>
      <Navigation
      today = {today}
      prevHandler = {prevHandler}
      todayHandler = {todayHandler}
      nextHandler = {nextHandler}
      />
      <CalendarGrid today = {today} startDay = {startDay}/>
    </div>
  );
}

export default App;
