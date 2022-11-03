import styled from '@emotion/styled';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { AppPage } from 'pages/_app';
import Skeleton from 'react-loading-skeleton';
import prisma from 'lib/prisma';
import { locationKeys, savedLocationsQuery } from 'lib/api/queries/locations';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) return {
      redirect: { destination: '/api/auth/signin', permanent: false }
    }

    const savedLocations = prisma.savedLocation.findMany({
      where: {
        userId: session.userId as string
      }
    });

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(locationKeys.all(), () => savedLocations);
  
    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    }
  }

const SavedLocationsPage: AppPage<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
  const savedLocations = useQuery(savedLocationsQuery());

  return (
    <Container>
      <h1>Your saved locations</h1>

      {savedLocations.status === 'loading' && (
        <>
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </>
      )}
      {savedLocations.status === 'success' && savedLocations.data.map(location => (
        <Link href={{ pathname: '/locations/[id]', query: { id: location.id } }} key={location.id} passHref>
          <ListItem>
            {location.name}
            <AltText>Latitude: {location.lat.toFixed(4)}, Longitude: {location.lon.toFixed(4)}</AltText>
          </ListItem>
        </Link>
      ))}
    </Container>
  );
}

export default SavedLocationsPage;

const Container = styled.div`
  padding: 35px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.a`
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: 10px;
  padding: 15px 20px;
  color: unset;
  text-decoration: none;
  font-weight: 500;
  transition: background-color .3s;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;

const AltText = styled.p`
  color: ${props => props.theme.colors.textAlt};
  font-size: 14px;
  margin: 0;
  font-weight: 400;
  margin-top: 5px;
`;

const Placeholder = styled(Skeleton)`
  height: 81px;
  border-radius: 10px;
`;