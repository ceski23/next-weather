import styled from '@emotion/styled';
import { format, isThisHour } from 'date-fns';
import { WeatherCode } from 'lib/api/weather';
import { isDay } from 'lib/utils/date';
import { getWeatherIcon } from 'lib/utils/weather';
import { FC } from 'react';

interface CompactDayWeatherProps {
  time: Date;
  temperature: number | null;
  status: WeatherCode | null;
}

const formatTime = (time: Date) => {
  if (isThisHour(time)) return 'Now';
  return format(time, 'HH:mm');
}

export const CompactDayWeather: FC<CompactDayWeatherProps> = ({ status, temperature, time }) => {
  return (
    <Container key={time.getTime()}>
      <Time>{formatTime(time)}</Time>
      <WeatherIcon as={getWeatherIcon(status, isDay(time) ? 'day' : 'night')} />
      {temperature && <Temperature>{temperature.toFixed()}°</Temperature>}
    </Container>
  );
};

const Time = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.textAlt};
  font-size: 16px;
`;

const Temperature = styled.p`
  font-size: 20px;
  margin: 0;
  font-weight: 500;
  text-align: center;
`;

const WeatherIcon = styled.svg`
  width: 50px;
  height: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;