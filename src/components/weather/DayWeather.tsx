import styled from '@emotion/styled';
import { CompactDayWeather } from 'components/weather/CompactDayWeather';
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import { getWeatherIcon } from 'lib/utils/weather';
import { FC } from 'react';

interface DayWeatherProps {
  weather: {
    date: Date;
    temperature: number;
    status: string;
  };
  detailedWeather: TempDayWeather;
  showDetailed: boolean;
  onClick: () => void;
}

type TempDayWeather = Array<{
  time: Date;
  temperature: number;
  status: string;
}>

const formatDate = (date: Date) => {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'cccc');
}

export const DayWeather: FC<DayWeatherProps> = ({ weather, detailedWeather, showDetailed, onClick }) => (
  <DayContainer key={weather.date.getTime()} onClick={onClick}>
    <QuickWeather>
      <DayInfo>
        <DayName>{formatDate(weather.date)}</DayName>
        <Date>{format(weather.date, 'dd MMM')}</Date>
      </DayInfo>
      <Temperature>{weather.temperature}°</Temperature>
      <WeatherIcon as={getWeatherIcon(weather.status)} />
    </QuickWeather>

    {showDetailed && (
      <DetailedWeather>
        {detailedWeather.map(({ time, status, temperature }) => (
          <CompactDayWeather status={status} temperature={temperature} time={time} key={time.getTime()} />
        ))}
      </DetailedWeather>
    )}
  </DayContainer>
);

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
`;

const Date = styled.p`
  margin: 0;
  font-size: 16px;
  color: ${props => props.theme.colors.textAlt};
`;

const DayName = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

const DayInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
`;

const Temperature = styled.p`
  margin: 0;
  font-size: 25px;
  font-weight: 500;
  flex: 1;
  text-align: center;
`;

const WeatherIcon = styled.svg`
  width: 70px;
  height: 70px;
`;

const DetailedWeather = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
`;

const QuickWeather = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;