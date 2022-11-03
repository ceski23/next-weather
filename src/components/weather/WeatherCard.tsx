import styled from '@emotion/styled';
import { FC } from 'react';
import { MapPin } from 'react-feather';
import Humidity from '@bybas/weather-icons/production/line/svg/humidity.svg';
import Wind from '@bybas/weather-icons/production/line/svg/wind.svg';
import Barometer from '@bybas/weather-icons/production/line/svg/barometer.svg';
import { formatDistanceToNow } from 'date-fns';
import bg from 'assets/morning_background.png';
import Skeleton from 'react-loading-skeleton';
import { mediaQueryUp } from 'lib/utils/styles';

interface WeatherCardProps {
  location?: string;
  updateDate: Date;
  pressure: string;
  humidity: string;
  windSpeed: string;
  temperature?: string;
  description?: string;
}

const WeatherCard: FC<WeatherCardProps> & { Placeholder: FC } = ({
  humidity,
  location,
  pressure,
  updateDate,
  windSpeed,
  temperature,
  description
}) => {
  return (
    <Container>
      <Info>
        <Top>
          {location && (
            <Location>
              <SmallIcon as={MapPin} />
              <LocationText>{location}</LocationText>
            </Location>
          )}
          <DateText>{formatDistanceToNow(updateDate, { addSuffix: true })}</DateText>
        </Top>
        
        {temperature && (
          <Middle>
            <Temperature>{temperature}<Degrees>°</Degrees></Temperature>
            {description && <WeatherDescription>{description}</WeatherDescription>}
          </Middle>
        )}

        <Bottom>
          <Measurement>
            <WeatherIcon as={Barometer} /> {pressure}
          </Measurement>

          <Measurement>
            <WeatherIcon as={Humidity} /> {humidity}
          </Measurement>

          <Measurement>
            <WeatherIcon as={Wind} /> {windSpeed}
          </Measurement>
        </Bottom>
      </Info>

      <TemperaturePanel>
        <TemperatureHeading>Temperature</TemperatureHeading>
      </TemperaturePanel>
    </Container>
  );
};

const WeatherCardPlaceholder: FC = () => (
  <Skeleton height={261} borderRadius={10} style={{ display: 'block' }} inline={true} />
);

WeatherCard.Placeholder = WeatherCardPlaceholder;

export default WeatherCard;

const Container = styled.div`
  background-color: ${props => props.theme.colors.time.morning.background};
  color: ${props => props.theme.colors.time.morning.text};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  background-image: url(${bg.src});

  ${mediaQueryUp('lg')} {
    flex-direction: row;
  }
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Location = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-weight: 600;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Temperature = styled.p`
  margin: 0;
  font-size: 60px;
  line-height: 1.2;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const WeatherDescription = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
`;

const DateText = styled.p`
  margin: 0;
  font-size: 12px;
`;

const Measurement = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
`;

const SmallIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

const WeatherIcon = styled.svg`
  width: 40px;
  height: 40px;
  margin: -10px;
  
   * {
    stroke: currentColor;
  }
`;

const Degrees = styled.sup`
  font-size: 40px;
`;

const TemperaturePanel = styled.div`
  flex: 1;
  background-color: #ffffff67;
  border-radius: 10px;
`;

const TemperatureHeading = styled.p`
  padding: 15px 20px;
  font-weight: 600;
  margin: 0;
`;

const LocationText = styled.span`
  flex: 1;
`;