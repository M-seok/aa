import React from "react";
import styled from "styled-components";

// 페이지네이션 컨테이너
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px; /* 20px에서 10px로 줄임 */
  gap: 8px;
  padding: 10px; /* 15px에서 10px로 줄임 */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

// 페이지 버튼 스타일
const PageButton = styled.button<{ active?: boolean }>`
  width: 32px; /* 36px에서 32px로 줄임 */
  height: 32px; /* 36px에서 32px로 줄임 */
  border-radius: 4px;
  background-color: ${props => props.active ? '#1a202c' : 'white'};
  color: ${props => props.active ? 'white' : '#1a202c'};
  border: 1px solid ${props => props.active ? '#1a202c' : '#e2e8f0'};
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : 'normal'};
  transition: all 0.2s ease;
  box-shadow: ${props => props.active ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'};
  
  &:hover {
    background-color: ${props => props.active ? '#1a202c' : '#f8f9fa'};
    border-color: ${props => props.active ? '#1a202c' : '#cbd5e0'};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: none;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // 표시할 페이지 버튼 수 설정 (예: 최대 5개)
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  
  // startPage 조정
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <PaginationContainer>
      {/* 이전 페이지 버튼 */}
      {currentPage > 1 && (
        <PageButton onClick={() => onPageChange(currentPage - 1)}>
          &lt;
        </PageButton>
      )}
      
      {/* 페이지 번호 버튼 */}
      {pageNumbers.map(page => (
        <PageButton
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
      
      {/* 다음 페이지 버튼 */}
      {currentPage < totalPages && (
        <PageButton onClick={() => onPageChange(currentPage + 1)}>
          &gt;
        </PageButton>
      )}
    </PaginationContainer>
  );
};

export default Pagination;
