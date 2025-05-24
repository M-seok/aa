import React, { useState, useRef } from "react";
import styled from "styled-components";
import PortfolioCard from "./PortfolioCard";
import CreatePortfolioCard from "./CreatePortfolioCard";

// 섹션 컨테이너 스타일
const SectionContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  max-width: 90%;
  margin: 0 auto;
  overflow: hidden;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  z-index: 1;
  margin-top: 20px;
`;

// 제목 래퍼
const TitleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
`;

// 제목 스타일
const SectionTitle = styled.h2`
  font-size: 1.5rem;
  position: relative;
  display: inline-block;
`;

// 강조할 부분 (내)
const TitleHighlight = styled.span`
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 3px;
    background-color: #1a202c;
    border-radius: 2px;
  }
`;

// 슬라이더 전체 컨테이너
const SliderOuterWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

// 화살표 버튼 공통 스타일
const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  background-color: transparent;
  border: none;
  color: #1a202c;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  opacity: 0.7;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    color: #2d3748;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;

// 왼쪽 화살표 버튼
const LeftArrow = styled(ArrowButton)`
  left: -10px;
`;

// 오른쪽 화살표 버튼
const RightArrow = styled(ArrowButton)`
  right: -10px;
`;

// 카드 컨테이너
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  width: calc(100% - 100px);
  margin: 10px auto;
  padding: 20px;
  background-color: #edf2f7;
  border-radius: 12px;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #cbd5e0;
`;

// 카드 래퍼
const CardWrapper = styled.div`
  transition: transform 0.3s ease;
  width: 95%;
  margin: 0 auto;
`;

// 내 포트폴리오 타입 정의
interface Portfolio {
  id: string;
  title: string;
  description: string;
}

interface MyPortfolioProps {
  portfolios: Portfolio[];
}

const MyPortfolio: React.FC<MyPortfolioProps> = ({ portfolios }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [portfolioList, setPortfolioList] = useState<Portfolio[]>(portfolios);
  const visibleCards = 5; // 한 화면에 보이는 카드 수
  const totalCards = portfolioList.length + 1; // 생성 버튼 포함
  const maxIndex = Math.max(0, totalCards - visibleCards);

  // 다음 카드로 이동
  const nextCard = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  // 이전 카드로 이동
  const prevCard = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // 포트폴리오 삭제 처리
  const handleDeletePortfolio = (id: string) => {
    setPortfolioList((prevList) => prevList.filter((portfolio) => portfolio.id !== id));
    
    // 삭제 후 현재 인덱스가 최대 인덱스보다 크면 조정
    const newMaxIndex = Math.max(0, portfolioList.length - 1 + 1 - visibleCards);
    if (currentIndex > newMaxIndex) {
      setCurrentIndex(newMaxIndex);
    }
  };

  // 현재 표시할 포트폴리오들
  const visiblePortfolios = portfolioList.slice(
    currentIndex,
    currentIndex + visibleCards - (currentIndex === 0 ? 1 : 0) // 첫 페이지에서는 생성 버튼 공간 확보
  );

  return (
    <SectionContainer>
      <TitleWrapper>
        <SectionTitle>
          <TitleHighlight>내</TitleHighlight> 포트폴리오
        </SectionTitle>
      </TitleWrapper>

      <SliderOuterWrapper>
        {/* 왼쪽 화살표 - 항상 표시 */}
        <LeftArrow 
          onClick={prevCard} 
          disabled={currentIndex === 0}
          aria-label="이전 포트폴리오"
        >
          &#10094;
        </LeftArrow>

        {/* 카드 컨테이너 */}
        <CardsContainer>
          {currentIndex === 0 && (
            <CardWrapper key="create-portfolio">
              <CreatePortfolioCard />
            </CardWrapper>
          )}
          {visiblePortfolios.map((portfolio) => (
            <CardWrapper key={portfolio.id}>
              <PortfolioCard
                id={portfolio.id}
                title={portfolio.title}
                description={portfolio.description}
                onDelete={handleDeletePortfolio}
                editable={true}
              />
            </CardWrapper>
          ))}
        </CardsContainer>

        {/* 오른쪽 화살표 - 항상 표시 */}
        <RightArrow 
          onClick={nextCard} 
          disabled={currentIndex >= maxIndex}
          aria-label="다음 포트폴리오"
        >
          &#10095;
        </RightArrow>
      </SliderOuterWrapper>
    </SectionContainer>
  );
};

export default MyPortfolio;
