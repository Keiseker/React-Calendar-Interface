import React from 'react'
import moment from "moment"
import { Navigation } from '../Navigaton';
import { CalendarGrid } from '../CalendarGrid';
import { Header } from '../Header';

function App() {
  // //неделя начинается с пн, а не с вс
  moment.updateLocale('en', {week:{dow:1}});
  // //даты начала и конца отоборажаемого месяца календаря
  const startDay = moment().startOf('month').startOf('week');
  // const endDay = moment().endOf('month').endOf('week');

  // const calendar = [];
  // const day = startDay.clone();

  // //заполнение дат календаря
  // while (!day.isAfter(endDay)){
  //   calendar.push(day.clone());
  //   day.add(1,'day');

  // };

  return (
    <div >
      <Header/>
      <Navigation/>
      <CalendarGrid startDay = {startDay}/>
    </div>
  );
}

export default App;
