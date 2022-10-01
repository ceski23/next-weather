import { FC } from 'react';
import LogoIcon from 'assets/logo.svg'
import styled from '@emotion/styled';
import { Styleable } from 'styles/styles';

const Logo: FC<Styleable> = ({ className }) => {
  return (
    <Container className={className}>
      <AppLogo />
      <Text><LighterText>Next</LighterText>Weather</Text>
    </Container>
  );
};

export default Logo

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Text = styled.p`
  margin: 0;
  font-weight: 600;
  margin-left: 10px;
  font-size: 22px;
`;

const LighterText = styled.span`
  color: ${props => props.theme.colors.primaryDark};
`;

const AppLogo = styled(LogoIcon)`
  width: 60px;
`;