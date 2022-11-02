import styled from '@emotion/styled';
import { FC } from 'react';

interface ProgressRingProps {
  text: string;
  progress: number;
}

export const ProgressRing: FC<ProgressRingProps> = ({ progress, text }) => (
  <Container>
    <Ring viewBox='0 0 100 100'>
      <Base 
        cx="50" 
        cy="50" 
        r="45" 
        stroke="currentColor" 
        strokeWidth="7" 
        fill="transparent"
      />
      
      <Progress 
        cx="50" 
        cy="50" 
        r="45" 
        stroke="currentColor" 
        strokeWidth="7" 
        strokeLinecap="round" 
        fill="transparent" 
        pathLength="100" 
        strokeDasharray="100" 
        strokeDashoffset={100 - progress} 
      />      
    </Ring>
    <Text>{text}</Text>
  </Container>
)

const Ring = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const Progress = styled.circle`
  color: ${props => props.theme.colors.primaryDark};
`;

const Base = styled.circle`
  color: ${props => props.theme.colors.primary};
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