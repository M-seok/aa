import React from "react";
import styled from "styled-components";

// 여기에 스타일 컴포넌트 정의
const FooterContainer = styled.footer`
  background-color: #3182ce;
  padding: 0 70px;
  font-size: 0.8rem;
`;

const FooterContent = styled.div`
  padding: 10px 0;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <span>developed by 고재우</span>
        <span>&copy; Sanhak team2</span>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
