import styled from '@emotion/styled';
import { FC, useState } from 'react';
import { Styleable } from 'styles/styles';
import LeftChevronIcon from 'assets/chevron-left.svg';
import RightChevronIcon from 'assets/chevron-right.svg';
import { addDays, endOfWeek, format, isAfter, isBefore, isSameDay, isSameMonth, isThisWeek, startOfWeek, subDays } from 'date-fns';
import { DayWeather } from 'components/weather/DayWeather';
import { HourlyWeatherData } from 'lib/api/weather';

export interface WeekDates {
  start: Date;
  end: Date;
}

interface WeekWeatherPanelProps extends Styleable {
  weekDates: WeekDates;
  data: Record<string, HourlyWeatherData[]>;
  onWeekChange: (weekDates: WeekDates) => void;
  min: Date;
  max: Date;
}

const formatTitle = (dates: WeekDates) => {
  if (isThisWeek(dates.start)) return 'This week';
  if (isSameMonth(dates.start, dates.end)) {
    return `${format(dates.start, 'dd')}-${format(dates.end, 'dd')} ${format(dates.start, 'MMMM')}`;
  }
  
  return `${format(dates.start, 'dd')} ${format(dates.start, 'MMM')} - ${format(dates.end, 'dd')} ${format(dates.end, 'MMM')}`;
}

export const WeekWeatherPanel: FC<WeekWeatherPanelProps> = ({ weekDates, data, className, onWeekChange, min, max }) => {
  const [expandedDay, setExpandedDay] = useState<string>();

  const selectPrevWeek = () => {
    let nextStart = startOfWeek(subDays(startOfWeek(weekDates.start), 1));
    if (isBefore(nextStart, min)) nextStart = min;
    const nextEnd = endOfWeek(nextStart);
    
    onWeekChange({ start: nextStart, end: nextEnd });
  }
  
  const selectNextWeek = () => {
    let nextEnd = endOfWeek(addDays(endOfWeek(weekDates.end), 1));
    if (isAfter(nextEnd, max)) nextEnd = max;
    const nextStart = startOfWeek(nextEnd);

    onWeekChange({ start: nextStart, end: nextEnd });
  }

  const handleDayClick = (date: string) => {
    if (expandedDay === date) setExpandedDay(undefined);
    else setExpandedDay(date);
  }

  return (
    <Container className={className}>
      <Header>
        <ArrowButton
          onClick={selectPrevWeek}
          disabled={isSameDay(weekDates.start, min)}
        >
          <ArrowIcon as={LeftChevronIcon} />
        </ArrowButton>
        
        <Title>{formatTitle(weekDates)}</Title>
        
        <ArrowButton
          onClick={selectNextWeek}
          disabled={isSameDay(weekDates.end, max)}
        >
          <ArrowIcon as={RightChevronIcon} />
        </ArrowButton>
      </Header>

      <DaysContainer>
        {Object.entries(data).map(([day, weather]) => (
          <DayWeather
            key={day}
            weather={weather}
            showDetailed={expandedDay === day}
            onClick={() => handleDayClick(day)}
          />
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

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
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

