import styled from '@emotion/styled';
import Button from 'components/common/Button';
import SearchInput from 'components/common/SearchInput';
import InfoCard from 'components/weather/InfoCard';
import { ProgressRing } from 'components/weather/ProgressRing';
import { UVScale } from 'components/weather/UVScale';
import WeatherCard from 'components/weather/WeatherCard';
import { WeekWeatherPanel } from 'components/weather/WeekWeatherPanel';
import { WindRose } from 'components/weather/WindRose';
import { addDays, startOfWeek } from 'date-fns';
import { useReverseSearchLocation, useSearchLocation } from 'lib/hooks/geocode';
import { useSaveLocation } from 'lib/hooks/locations';
import { useWeather } from 'lib/hooks/weather';
import { useGeolocation } from 'lib/useGeolocation';
import { calcProgress } from 'lib/utils/math';
import { mediaQueryUp } from 'lib/utils/styles';
import { formatLocationText, getWeatherDescription } from 'lib/utils/weather';
import { useSession } from 'next-auth/react';
import Image from 'next/future/image';
import { AppPage } from 'pages/_app';
import { useMemo, useState } from 'react';

const Dashboard: AppPage = () => {
  const { data: session } = useSession();  
  
  const [query, setQuery] = useState('');
  const manualLocation = useSearchLocation(query);

  const geolocation = useGeolocation();

  const coords = useMemo(() => {
    if (query.length === 0) {
      return geolocation.location ? {
        lat: geolocation.location.coords.latitude,
        lon: geolocation.location.coords.longitude
      } : undefined;
    }

    return manualLocation.data ? {
      lat: Number(manualLocation.data.lat),
      lon: Number(manualLocation.data.lon)
    } : undefined;
  }, [geolocation.location, manualLocation.data, query.length]);

  const location = useReverseSearchLocation(coords);

  const locationText = useMemo(() => {
    if (query.length === 0) {
      return formatLocationText(location.data?.address) ?? location.data?.display_name
    }

    return manualLocation.data?.display_name;
  }, [location.data, manualLocation.data?.display_name, query.length]);

  const weather = useWeather(coords);
  const currentWeather = weather.data?.properties.timeseries[0].data;

  const { mutate: saveLocation } = useSaveLocation();

  const handleSaveLocation = () => {
    if (!locationText || !coords) return;

    saveLocation({
      name: locationText,
      lat: coords.lat,
      lon: coords.lon
    });
  }

  const [selectedWeekDate, setSelectedWeekDate] = useState(startOfWeek(new Date()));

  return (
    <Container>
      <MainColumn>
        <Header>
          <SearchInput onDebouncedChange={setQuery} defaultValue={query} placeholder="Search for a place..." />
          {session?.user?.image && session.user.name && (
            <Avatar src={session.user.image} alt={session.user.name} width={45} height={45} />
          )}
        </Header>

        {weather.status === 'loading' && <WeatherCard.Placeholder />}
        {weather.status === 'success' && (
          <WeatherCard
            key={query}
            location={locationText}
            humidity={currentWeather?.instant.details.relative_humidity + weather.data.properties.meta.units.relative_humidity}
            pressure={currentWeather?.instant.details.air_pressure_at_sea_level + weather.data.properties.meta.units.air_pressure_at_sea_level}
            updateDate={new Date(weather.data.properties.meta.updated_at)}
            windSpeed={currentWeather?.instant.details.wind_speed + weather.data.properties.meta.units.wind_speed}
            temperature={String(currentWeather?.instant.details.air_temperature)}
            description={getWeatherDescription(currentWeather?.next_1_hours.summary.symbol_code)}
          />
        )}

        {session?.user && (
          <div style={{ marginTop: 20 }}>
            <Button onClick={handleSaveLocation}>Save to favourites</Button>
          </div>
        )}

        {weather.status === 'loading' && (
          <InfoGrid>
            <InfoCard.Placeholder />
            <InfoCard.Placeholder />
            <InfoCard.Placeholder />
            <InfoCard.Placeholder />
          </InfoGrid>
        )}
        {weather.status === 'success' && (
          <InfoGrid>
            <InfoCard
              title='Wind'
              description='Today wind speed'
              value={currentWeather?.instant.details.wind_speed + weather.data.properties.meta.units.wind_speed}
              content={<WindRose direction={currentWeather?.instant.details.wind_from_direction} />}
            />

            <InfoCard
              title='Precipitation amount'
              description='Today precipitation amount'
              value={currentWeather?.next_1_hours.details.precipitation_amount + weather.data.properties.meta.units.precipitation_amount}
              content={<ProgressRing text='Low' progress={calcProgress(0, 500, Number(currentWeather?.next_1_hours.details.precipitation_amount))} />}
            />

            <InfoCard
              title='Pressure'
              description='Today pressure'
              value={currentWeather?.instant.details.air_pressure_at_sea_level + weather.data.properties.meta.units.air_pressure_at_sea_level}
              content={<ProgressRing text='Normal' progress={calcProgress(900, 1090, Number(currentWeather?.instant.details.air_pressure_at_sea_level))} />}
            />

            <InfoCard
              title='UV Index'
              description='Today UV index'
              value={String(currentWeather?.instant.details.ultraviolet_index_clear_sky ?? 0)}
              content={<UVScale text='Low' progress={30} />}
            />
          </InfoGrid>
        )}
      </MainColumn>

      <RightSidebar>
        <WeekWeatherPanel
          weekStartDate={selectedWeekDate}
          onWeekChange={setSelectedWeekDate}
          data={[
            { date: selectedWeekDate, temperature: 16, status: 'cloudy' },
            { date: addDays(selectedWeekDate, 1), temperature: 16, status: 'clearsky_day' },
            { date: addDays(selectedWeekDate, 2), temperature: 16, status: 'thunderstorms_rain' },
            { date: addDays(selectedWeekDate, 3), temperature: 16, status: 'partly_cloudy' },
            { date: addDays(selectedWeekDate, 4), temperature: 16, status: 'partly_cloudy' },
            { date: addDays(selectedWeekDate, 5), temperature: 16, status: 'partly_cloudy' },
            { date: addDays(selectedWeekDate, 6), temperature: 16, status: 'partly_cloudy' },
          ]}
        />
      </RightSidebar>
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  ${mediaQueryUp('xl')} {
    flex-direction: row;
  }
`;

const MainColumn = styled.div`
  padding: 15px;
  flex: 1;

  ${mediaQueryUp('sm')} {
    padding: 35px 50px;
  }
`;

const RightSidebar = styled.div`
  border-left: 2px solid ${props => props.theme.colors.border};
  width: 100%;
  height: 100%;

  ${mediaQueryUp('xl')} {
    width: 400px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-top: 30px;

  ${mediaQueryUp('lg')} {
    grid-template-columns: 1fr 1fr;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const Avatar = styled(Image)`
  border-radius: 50%;
`;