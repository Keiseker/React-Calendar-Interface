import React from 'react'
import styled from 'styled-components'
import colors from '../colors';
import moment from 'moment';

//создание сетки
const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7,1fr);
    background-color:${props => props.isHeader ? 'white': colors.gridGapColor};
    grid-gap:1px;
    ${props => props.isHeader && 'border-bottom: 1px solid ${colors.gridGapColor}'};
    `;

const CellWrapper = styled.div`
    min-width:140px;
    min-height:${props => props.isHeader ? 30: 100}px;
    background-color:${colors.gridBackground};
    font-size:18px;
    font-weight:600;
    color:${props => props.isSelectedMonth? colors.gridTextColor:colors.gridTextColorUnselected };
    
`;
const RowInCell = styled.div`
    display:flex;
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
    ${props => props.pr && `padding-right: ${props.pr * 14}px`};
`;
const DayWrapper = styled.div`
    margin-top:8px;
    margin-right:8px;
    height:33px;
    width: 33px;
    display:flex;
    align-items: center;
    justify-content: center;

`;

const CurrentDay = styled('div')`
    height:100%;
    width:100%;
    background:${colors.currentDayColor};
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    color:white;
`;

const CalendarGrid = ({startDay,today}) => {
    //всего дней отображаемого месяца
    const totalDays = 42;
    const day = startDay.clone().subtract(1,'day');
    //массив отображаемых дней месяца
    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());
    const isCurrentDay = (day) => moment().isSame(day,'day');
    const isSelectedMonth = (day) => today.isSame(day,'month');
    return (
    <>
    <GridWrapper isHeader>
        {[...Array(7,)].map((_,i)=>
            <CellWrapper isHeader isSelectedMonth>
            <RowInCell justifyContent={'flex-end'} pr={1}>
            {moment().day(i + 1).format('dd')}
            </RowInCell>
            </CellWrapper>
            )}
    </GridWrapper>
    <GridWrapper>
        {
            daysArray.map((dayItem) => (
                <CellWrapper 
                key={dayItem.unix()}
                isSelectedMonth ={isSelectedMonth(dayItem)}
                >
                    <RowInCell
                    justifyContent={'flex-end'}>
                        <DayWrapper>
                            {!isCurrentDay(dayItem) && dayItem.format('D')}
                            {isCurrentDay(dayItem) && <CurrentDay>{dayItem.format('D')}</CurrentDay>}
                        </DayWrapper>
                    </RowInCell>
                </CellWrapper>
            ))
        }
    </GridWrapper>
    </>
    );
};

export{CalendarGrid};