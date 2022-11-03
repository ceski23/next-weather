import styled from '@emotion/styled';
import { CompactDayWeather } from 'components/weather/CompactDayWeather';
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import { HourlyWeatherData } from 'lib/api/weather';
import { getWeatherIcon } from 'lib/utils/weather';
import { FC } from 'react';

interface DayWeatherProps {
  weather: HourlyWeatherData[];
  showDetailed: boolean;
  onClick: () => void;
}

const formatDate = (date: Date) => {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'cccc');
}

export const DayWeather: FC<DayWeatherProps> = ({ weather, showDetailed, onClick }) => {
  const averageTemperature = weather.reduce((sum, { apparent_temperature }) => sum + (apparent_temperature ?? 0), 0) / weather.length;

  return (
    <DayContainer onClick={onClick}>
      <QuickWeather>
        <DayInfo>
          <DayName>{formatDate(new Date(weather[0].time))}</DayName>
          <DayDate>{format(new Date(weather[0].time), 'dd MMM')}</DayDate>
        </DayInfo>
        <Temperature>{averageTemperature.toFixed()}°</Temperature>
        <WeatherIcon as={getWeatherIcon(weather[0].weathercode)} />
      </QuickWeather>
  
      {showDetailed && (
        <DetailedWeather>
          {weather.map(({ apparent_temperature, weathercode, time }) => (
            <CompactDayWeather
              status={weathercode}
              temperature={apparent_temperature}
              time={new Date(time)}
              key={time}
            />
          ))}
        </DetailedWeather>
      )}
    </DayContainer>
  );
}

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
`;

const DayDate = styled.p`
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