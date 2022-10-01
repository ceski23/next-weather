import styled from '@emotion/styled';
import { FC, PropsWithChildren } from 'react';
import { Styleable } from 'styles/styles';

interface WeatherPanelProps extends PropsWithChildren, Styleable {

}

const WeatherPanel: FC<WeatherPanelProps> = ({ className, children }) => {
  return (
    <Container className={className}>
      {children}
    </Container>
  );
};

export default WeatherPanel;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;