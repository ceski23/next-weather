import styled from '@emotion/styled';
import { ReactComponent as WindRoseBase } from 'assets/wind_rose.svg'
import { FC } from 'react';

interface WindRoseProps {
  direction?: number;
}

export const WindRose: FC<WindRoseProps> = ({ direction = 0 }) => {
  return (
    <Container>
      <WindRoseBase width={100} height="100%" fontWeight="500" />
      
      <Arrow xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 100" direction={direction} style={{ transform: `rotate(${direction - 90}deg)` }}>
        <defs>
          <marker id="arrowbase" markerWidth="10" markerHeight="5" refX="2" refY="2.5" orient="auto">
            <circle cx="4.35" cy="2.5" r="2" stroke="currentColor" fill="white" />
          </marker>
          <marker id="arrowhead" markerWidth="5" markerHeight="5" refX="0" refY="2.5" orient="auto">
            <polygon points="0 0, 5 2.5, 0 5" fill="currentColor" />
          </marker>
        </defs>
        <line x1="0" y1="50" x2="300" y2="50" stroke="currentColor" strokeWidth="8" markerEnd="url(#arrowhead)"
          markerStart="url(#arrowbase)" />
      </Arrow>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`;

const Arrow = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  color: ${props => props.theme.colors.primaryDark};
`;