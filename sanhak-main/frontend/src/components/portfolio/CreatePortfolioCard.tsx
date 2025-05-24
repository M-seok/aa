import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 포트폴리오 생성 카드 스타일
const CreateCardContainer = styled.div`
  height: 300px;
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  border: 2px dashed #cbd5e0;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    border-color: #90cdf4;
    background-color: #f0f7ff;
  }
`;

const PlusButton = styled.div`
  width: 80px;
  height: 80px;
  background-color: #e6f2ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #cbd5e0;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #90cdf4;
    border-color: #3182ce;
    transform: scale(1.05);
  }
`;

const PlusIcon = styled.span`
  font-size: 50px;
  font-weight: 300;
  color: #3182ce;
  line-height: 1;
`;

const CreateText = styled.p`
  color: #4a5568;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 10px;
`;

const CreatePortfolioCard: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/edit"); // 포트폴리오 생성 페이지로 이동
  };

  return (
    <CreateCardContainer onClick={handleClick}>
      <PlusButton>
        <PlusIcon>+</PlusIcon>
      </PlusButton>
      <CreateText>새 포트폴리오 추가</CreateText>
    </CreateCardContainer>
  );
};

export default CreatePortfolioCard;
