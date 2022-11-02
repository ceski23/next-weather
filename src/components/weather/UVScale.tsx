import styled from '@emotion/styled';
import { FC } from 'react';

interface UVScaleProps {
  text: string;
  progress: number;
}

export const UVScale: FC<UVScaleProps> = ({ text }) => (
  <Container>
    <Scale viewBox='0 0 100 100'>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4cb482" />
          <stop offset="33%" stopColor="#f4fd72" />
          <stop offset="66%" stopColor="#ff7840" />
          <stop offset="100%" stopColor="#ff4040" />
        </linearGradient>
      </defs>
      
      <Progress 
        cx="50" 
        cy="50" 
        r="45" 
        stroke="url(#gradient)"
        strokeWidth="7" 
        strokeLinecap="round" 
        fill="transparent" 
        pathLength="100" 
        strokeDasharray="100" 
        strokeDashoffset="30"
      />

      <circle
        cx="95" 
        cy="50" 
        r="7" 
        fill="white" 
      />
    </Scale>
    <Text>{text}</Text>
  </Container>
)

const Scale = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(145deg);
`;

const Progress = styled.circle`
  color: ${props => props.theme.colors.primaryDark};
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Text = styled.p`
  margin: 0;
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
`;