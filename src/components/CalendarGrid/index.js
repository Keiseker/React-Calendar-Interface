import React from 'react'
import styled from 'styled-components'

//создание сетки
const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7,1fr);
    grid-template-rows: repeat(6,1fr);
    background-color:#e1e2e6;
    grid-gap:1.5px;
    `;

const CellWrapper = styled.div`
    min-width:140px;
    min-height:100px;
    background-color:white;
    color:black;
`;
const RowInCell = styled.div`
    display:flex;
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'}
`;
const DayWrapper = styled.div`
    height:33px;
    width: 33px;
    display:flex;
    align-items: center;
    justify-content: center;
`;

const CalendarGrid = ({startDay}) => {
    //всего дней отображаемого месяца
    const totalDays = 42;
    const day = startDay.clone().subtract(1,'day');
    //массив отображаемых дней месяца
    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());
    console.log(daysArray);
    return (
    <GridWrapper>
        {
            daysArray.map((dayItem) => (
                <CellWrapper 
                key={dayItem.format('DDMMYYYY')
                }>
                    <RowInCell
                    justifyContent={'flex-end'}>
                        <DayWrapper>
                            {dayItem.format('D')}
                            </DayWrapper>
                    </RowInCell>
                </CellWrapper>
            ))
        }
    </GridWrapper>
    );
};

export{CalendarGrid};