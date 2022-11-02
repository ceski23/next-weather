import { FC } from 'react';
import ThunderstormIcon from '@bybas/weather-icons/production/fill/svg/thunderstorms-rain.svg';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Button from 'components/common/Button';

const Page404: FC = () => {
  const router = useRouter();

  return (
    <Container>
      <ThunderstormIcon width={300} />
      <Title>Nie znaleziono takiej strony</Title>
      <Text>Nie udało nam się znaleźć tej strony. Być może link jest uszkodzony lub strona została przeniesiona.</Text>
      <Button onClick={() => router.back()}>Powrót</Button>
    </Container>
  );
};

export default Page404;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: min(80%, 400px);
  margin: auto;
  height: 100%;
`;

const Title = styled.p`
  font-size: 25px;
  font-weight: 600;
  margin: 0;
`;

const Text = styled.p`
  font-size: 18px;
  margin-bottom: 50px;
`;