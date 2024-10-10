import React from 'react'
import styled from 'styled-components'
import colors from '../colors';

const DivWrapper = styled('div')`
    display: flex;
    justify-content: space-between;
    padding:16px;
    background-color:${colors.primary};
`;

const TextWrapper = styled('span')`
    font-size:32px;
    margin-right:8px;
    color: ${colors.textPrimary};
`;
const TitleWrapper = styled(TextWrapper)`
    font-weight:600;
`;
const ButtonDiv = styled('div')`
    display: flex;
    align-items:center;
`;
const ButtonWrapper = styled('button')`
    border:unset;
    height:30px;
    font-size:24px;
    border-radius:4px;
    padding-right:8px;
    padding-left:8px;
    font-weight:600;
    background-color:${colors.primary};
    color:${colors.textPrimary};
`;

const TodayButton = styled(ButtonWrapper)`


`;

const Navigation = () => {
    return(
    <DivWrapper>
        <div>
            <TitleWrapper>December</TitleWrapper>
            <TextWrapper>2020</TextWrapper>
        </div>
        <ButtonDiv>
            <ButtonWrapper>&lt;</ButtonWrapper>
            <TodayButton>Сегодня</TodayButton>
            <ButtonWrapper>&gt;</ButtonWrapper>
        </ButtonDiv>
    </DivWrapper>);
};

export{Navigation};