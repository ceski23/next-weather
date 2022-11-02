import styled from '@emotion/styled';
import { FC, useState } from 'react';
import { Styleable } from 'styles/styles';
import LeftChevronIcon from 'assets/chevron-left.svg';
import RightChevronIcon from 'assets/chevron-right.svg';
import { addDays, addHours, endOfWeek, format, isSameMonth, isThisWeek, startOfWeek, subDays } from 'date-fns';
import { DayWeather } from 'components/weather/DayWeather';

type TempWeekWeather = Array<{
  date: Date;
  temperature: number;
  status: string;
}>

interface WeekWeatherPanelProps extends Styleable {
  weekStartDate: Date;
  data: TempWeekWeather;
  onWeekChange: (weekStartDate: Date) => void;
}

const formatTitle = (date: Date) => {
  if (isThisWeek(date)) return 'This week';
  
  const start = startOfWeek(date);
  const end = endOfWeek(date);
  if (isSameMonth(start, end)) return `${format(start, 'dd')}-${format(end, 'dd')} ${format(date, 'MMMM')}`;
  
  return `${format(start, 'dd')} ${format(start, 'MMM')} - ${format(end, 'dd')} ${format(end, 'MMM')}`;
}

export const WeekWeatherPanel: FC<WeekWeatherPanelProps> = ({ weekStartDate, data, className, onWeekChange }) => {
  const [expandedDay, setExpandedDay] = useState<number>();

  const selectPrevWeek = () => {
    const nextDate = startOfWeek(subDays(startOfWeek(weekStartDate), 1));
    onWeekChange(nextDate);
  }
  
  const selectNextWeek = () => {
    const nextDate = addDays(endOfWeek(weekStartDate), 1);
    onWeekChange(nextDate);
  }

  const handleDayClick = (idx: number) => {
    if (expandedDay === idx) setExpandedDay(undefined);
    else setExpandedDay(idx);
  }

  return (
    <Container className={className}>
      <Header>
        <ArrowButton onClick={selectPrevWeek}><ArrowIcon as={LeftChevronIcon} /></ArrowButton>
        <Title>{formatTitle(weekStartDate)}</Title>
        <ArrowButton onClick={selectNextWeek}><ArrowIcon as={RightChevronIcon} /></ArrowButton>
      </Header>

      <DaysContainer>
        {data.map((weather, idx) => (
          <DayWeather weather={weather} detailedWeather={[
            { ...weather, time: new Date() },
            { ...weather, time: addHours(new Date(), 2) },
            { ...weather, time: addHours(new Date(), 4) },
            { ...weather, time: addHours(new Date(), 6) },
          ]} key={weather.date.getTime()} showDetailed={expandedDay === idx} onClick={() => handleDayClick(idx)} />
        ))}
      </DaysContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 40px 40px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ArrowIcon = styled.svg`
  width: 30px;
  height: 30px;
  color: ${props => props.theme.colors.text};
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin: 0;
`;

const DaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

