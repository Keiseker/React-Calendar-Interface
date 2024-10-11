import React from 'react'
import styled from 'styled-components'
import colors from '../colors';
import moment from 'moment';

//создание сетки
const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7,1fr);
    grid-template-rows: repeat(6,1fr);
    background-color:${colors.gridGapColor};
    grid-gap:1px;
    `;

const CellWrapper = styled.div`
    min-width:140px;
    min-height:100px;
    background-color:${colors.gridBackground};
    font-size:18px;
    font-weight:600;
    color:${colors.gridTextColor};
    
`;
const RowInCell = styled.div`
    display:flex;
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'}
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

const CalendarGrid = ({startDay}) => {
    //всего дней отображаемого месяца
    const totalDays = 42;
    const day = startDay.clone().subtract(1,'day');
    //массив отображаемых дней месяца
    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());
    const isCurrentDay = (day) => moment().isSame(day,'day');
    return (
    <GridWrapper>
        {
            daysArray.map((dayItem) => (
                <CellWrapper 
                key={dayItem.unix()}
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
    );
};

export{CalendarGrid};