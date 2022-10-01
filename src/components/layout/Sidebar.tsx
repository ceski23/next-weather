import styled from '@emotion/styled';
import ActiveLink from 'components/common/ActiveLink';
import Logo from 'components/common/Logo';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FC } from 'react';
import { Grid, Heart, Icon, LogOut, LogIn, Map, Settings } from 'react-feather';
import { Styleable } from 'styles/styles';

type NavItem = {
  Icon: Icon
  text: string
  href: string
}

const navigationItems: NavItem[] = [
  { Icon: Grid, text: 'Dashboard', href: '/dashboard' },
  { Icon: Map, text: 'Map', href: '/map' },
  { Icon: Heart, text: 'Saved Locations', href: '/locations' },
  { Icon: Settings, text: 'Settings', href: '/settings' },
]

const Sidebar: FC<Styleable> = ({ className }) => {
  const session = useSession();

  return (
    <Container className={className}>
      <AppLogo />
  
      <Navigation>
        {navigationItems.map(({href, text, Icon }) => (
          <ActiveLink href={href} key={text} passHref activeClassName='active'>
            <NavItem>
              <NavIcon as={Icon} />
              {text}
            </NavItem>
          </ActiveLink>
        ))}
      </Navigation>
  
      {session.status !== 'loading' && (
        <LogoutContainer>
          {session.status === 'authenticated' && (
            <NavItem onClick={() => signOut({ redirect: false })}>
              <NavIcon as={LogOut} />
              Log out
            </NavItem>
          )}
          {session.status === 'unauthenticated' && (
            <NavItem onClick={() => signIn('github')}>
              <NavIcon as={LogIn} />
              Log in
            </NavItem>
          )}
        </LogoutContainer>
      )}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-right: 2px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
`;

const AppLogo = styled(Logo)`
  align-self: center;
  margin: 30px auto;
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NavIcon = styled.svg`
  color: ${props => props.theme.colors.textAlt};
`;

const NavItem = styled.a`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colors.textAlt};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  position: relative;
  text-decoration: none;

  &.active {
    color: ${props => props.theme.colors.text};

    ${NavIcon} {
      color: ${props => props.theme.colors.primaryDark};
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 2px;
      height: calc(100% + 20px);
      background-color: ${props => props.theme.colors.background};
      right: -2px;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 2px;
      height: 100%;
      background-color: ${props => props.theme.colors.primaryDark};
      right: -2px;
    }
  }
`;

const LogoutContainer = styled.div`
  margin-top: auto;
  margin: auto 0 20px;
`;