import React, { ReactNode } from "react";
import styled from "styled-components";

// 스타일 컴포넌트들
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const Content = styled.main`
  flex-grow: 1;
  overflow: hidden;
`;

// props 타입 정의
interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

export default PageLayout;
