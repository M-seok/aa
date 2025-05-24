import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PortfolioCard from "./PortfolioCard";
import Pagination from "./Pagination";

// 섹션 컨테이너 스타일
const SectionContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 90%;
  margin: 0 auto;
  padding: 15px; /* 20px에서 15px로 줄임 */
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

// 제목 래퍼
const TitleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: 15px; /* 20px에서 15px로 줄임 */
`;

// 섹션 제목 스타일
const SectionTitle = styled.h2`
  font-size: 1.5rem;
  position: relative;
  display: inline-block;
`;

// 강조할 부분 (전체)
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

// 그리드 컨테이너
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-bottom: 10px; /* 15px에서 10px로 더 줄임 */
  padding: 15px; /* 20px에서 15px로 줄임 */
  background-color: #edf2f7;
  border-radius: 12px;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #cbd5e0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

// 카드 래퍼
const CardWrapper = styled.div`
  transition: transform 0.3s ease;
  width: 95%;
  margin: 0 auto;
`;

// 포트폴리오 타입 정의
interface Portfolio {
  id: string;
  title: string;
  description: string;
}

interface AllPortfolioProps {
  portfolios: Portfolio[];
  itemsPerPage?: number;
}

const AllPortfolio: React.FC<AllPortfolioProps> = ({
  portfolios,
  itemsPerPage = 15, // 기본값: 5열 x 3행
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [portfolioList, setPortfolioList] = useState<Portfolio[]>(portfolios);
  const [currentItems, setCurrentItems] = useState<Portfolio[]>([]);
  const totalPages = Math.ceil(portfolioList.length / itemsPerPage);

  useEffect(() => {
    // 현재 페이지에 표시할 포트폴리오 항목 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(portfolioList.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, portfolioList, itemsPerPage]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 변경 시 상단으로 스크롤 (선택 사항)
    window.scrollTo({
      top: document.getElementById("all-portfolio")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  // 포트폴리오 삭제 처리
  const handleDeletePortfolio = (id: string) => {
    setPortfolioList((prevList) => prevList.filter((portfolio) => portfolio.id !== id));
    
    // 포트폴리오 삭제 후 페이지 조정
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <SectionContainer id="all-portfolio">
      <TitleWrapper>
        <SectionTitle>
          <TitleHighlight>전체</TitleHighlight> 포트폴리오
        </SectionTitle>
      </TitleWrapper>
      <GridContainer>
        {currentItems.map((portfolio) => (
          <CardWrapper key={portfolio.id}>
            <PortfolioCard
              id={portfolio.id}
              title={portfolio.title}
              description={portfolio.description}
            />
          </CardWrapper>
        ))}
      </GridContainer>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </SectionContainer>
  );
};

export default AllPortfolio;
