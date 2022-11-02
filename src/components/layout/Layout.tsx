import styled from '@emotion/styled';
import Sidebar from 'components/layout/Sidebar';
import { mediaQueryUp } from 'lib/utils/styles';
import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <MainSidebar />
    <Content>{children}</Content>
  </>
);

export default Layout;

const Content = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding-bottom: 64px;

  ${mediaQueryUp('md')} {
    margin-left: 260px;
    padding-bottom: 0;
  }
`;

const MainSidebar = styled(Sidebar)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  height: 0;

  ${mediaQueryUp('md')} {
    width: 260px;
    height: 100vh;
  }
`;