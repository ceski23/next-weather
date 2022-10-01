import styled from '@emotion/styled';
import Sidebar from 'components/layout/Sidebar';
import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <MainSidebar />
    <Content>{children}</Content>
  </>
);

export default Layout;

const Content = styled.div`
  margin-left: 260px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainSidebar = styled(Sidebar)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 260px;
  height: 100vh;
`;