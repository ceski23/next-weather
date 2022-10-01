import styled from '@emotion/styled';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

interface InfoCardProps {
  title: string
  description: string
  value: string
}

const InfoCard: FC<InfoCardProps> & { Placeholder: FC } = ({ description, title, value }) => {
  return (
    <Container>
      <Info>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Value>{value}</Value>
      </Info>
    </Container>
  );
};

const InfoCardPlaceholder: FC = () => (
  <Skeleton height={120} borderRadius={10} style={{ display: 'block' }} inline={true} />
);

InfoCard.Placeholder = InfoCardPlaceholder;

export default InfoCard;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  padding: 15px 20px;
  border-radius: 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  margin: 0;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Description = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.textAlt};
  font-size: 12px;
  margin-bottom: 20px;
`;

const Value = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 18px;
`;