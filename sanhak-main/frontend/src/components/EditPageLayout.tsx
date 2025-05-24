import React, { ReactNode } from "react";
import styled from "styled-components";

// 스타일 컴포넌트들
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const Content = styled.main`
  flex-grow: 1;
  overflow-y: auto;
`;

// props 타입 정의
interface EditPageLayoutProps {
  children: ReactNode;
}

const EditPageLayout: React.FC<EditPageLayoutProps> = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

export default EditPageLayout;
