import styled from '@emotion/styled';
import ActiveLink from 'components/common/ActiveLink';
import Logo from 'components/common/Logo';
import { mediaQueryUp } from 'lib/utils/styles';
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
            <NavItem title={text}>
              <NavIcon as={Icon} />
              <NavText>{text}</NavText>
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
  display: none;

  ${mediaQueryUp('md')} {
    display: inherit;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 20px;
  background-color: ${props => props.theme.colors.background};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  box-shadow: 0 0 10px ${props => props.theme.colors.border};
  z-index: 10;

  ${mediaQueryUp('md')} {
    flex-direction: column;
    position: static;
    padding: unset;
    box-shadow: none;
  }
`;

const NavIcon = styled.svg`
  color: ${props => props.theme.colors.textAlt};
`;

const NavText = styled.span`
  display: none;

  ${mediaQueryUp('md')} {
    display: block;
  }
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
    background-color: ${props => props.theme.colors.backgroundAlt};
    border-radius: 10px;

    ${NavIcon} {
      color: ${props => props.theme.colors.primaryDark};
    }
  }

  ${mediaQueryUp('md')} {
    &.active {
      background: none;
      border-radius: 10px;

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
  }
`;

const LogoutContainer = styled.div`
  margin-top: auto;
  margin: auto 0 20px;
  display: none;

  ${mediaQueryUp('md')} {
    display: block;
  }
`;