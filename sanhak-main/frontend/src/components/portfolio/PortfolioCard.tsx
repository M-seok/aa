import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 포트폴리오 카드 스타일
const CardContainer = styled.div`
  height: 290px;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
  border: 2px solid #e2e8f0; /* 테두리 두께 증가 및 색상 변경 */
  position: relative;
  overflow: hidden;
  cursor: pointer; /* 클릭 가능함을 알리는 커서 */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    border-color: #90cdf4; /* 호버 시 테두리 색상 변경 */
    background-color: #f7fafc; /* 호버 시 배경색 변경 */
  }

  &:hover .view-indicator {
    opacity: 1;
    transform: translateX(0);
  }

  &:active {
    transform: translateY(-2px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px; /* 너비 증가 */
    height: 100%;
    background: linear-gradient(to bottom, #3182ce, #63b3ed); /* 색상 변경 */
    opacity: 0.9; /* 불투명도 증가 */
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: 600;
  color: #1a202c;
  padding-left: 12px; /* 좌측 패딩 증가 */
  border-bottom: 1px solid #e2e8f0; /* 제목 아래 구분선 추가 */
  padding-bottom: 8px; /* 구분선과 텍스트 사이 여백 */
`;

const CardDescription = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 4줄까지 표시 */
  -webkit-box-orient: vertical;
  line-height: 1.5;
  padding-left: 12px; /* 좌측 패딩 증가 */
  padding-top: 8px; /* 위쪽 여백 추가 */
`;

// 옵션 버튼 스타일
const OptionsButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  background-color: #f0f5ff;
  border-radius: 50%;
  border: 1px solid #cbd5e0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    background-color: #e6f0ff;
    transform: scale(1.05);
    border-color: #90cdf4;
  }

  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

// 드롭다운 메뉴 스타일
const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 40px;
  right: 8px;
  width: 130px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 20;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease-in-out;
  transform-origin: top right;
  transform: ${({ isOpen }) => isOpen ? "scale(1)" : "scale(0.95)"};
  opacity: ${({ isOpen }) => isOpen ? "1" : "0"};
`;

// 드롭다운 아이템 스타일
const DropdownItem = styled.div`
  padding: 10px 14px;
  font-size: 0.9rem;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  font-weight: 500;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #ebf8ff;
    color: #3182ce;
    padding-left: 18px;
  }

  &:active {
    background-color: #bee3f8;
    transform: scale(0.98);
  }

  & + & {
    border-top: 1px solid #edf2f7;
  }

  /* 호버 시 좌측에서 우측으로 애니메이션 효과 */
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(190, 227, 248, 0.2), transparent);
    transition: transform 0.5s ease;
  }

  &:hover:before {
    transform: translateX(100%);
  }
`;

// 아이콘 컨테이너
const IconContainer = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 편집 아이콘
const EditIcon = styled.div`
  width: 14px;
  height: 14px;
  position: relative;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 3px;
    width: 8px;
    height: 8px;
    border: 1.5px solid currentColor;
    border-radius: 1px;
    transform: rotate(45deg);
  }
  
  &:after {
    content: "";
    position: absolute;
    bottom: 2px;
    left: 1px;
    width: 6px;
    height: 2px;
    background-color: currentColor;
    transform: rotate(45deg);
  }
`;

// 삭제 아이콘
const DeleteIcon = styled.div`
  width: 14px;
  height: 14px;
  position: relative;
  
  &:before, &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 14px;
    height: 2px;
    background-color: currentColor;
  }
  
  &:before {
    transform: rotate(45deg);
  }
  
  &:after {
    transform: rotate(-45deg);
  }
`;

// 더 깔끔한 수직 점 3개 아이콘
const DotsContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 2px;
  height: 14px;
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  background-color: #3182ce;
  border-radius: 50%;
`;

// 지시자 아이콘 (오른쪽 화살표)
const ViewIndicator = styled.div`
  position: absolute;
  bottom: 10px;
  right: 12px;
  width: 20px;
  height: 20px;
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateX(-5px);
  display: flex;
  align-items: center;
  
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 12px;
    height: 2px;
    background-color: #3182ce;
    transform: translateY(-50%);
  }
  
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    width: 6px;
    height: 6px;
    border-top: 2px solid #3182ce;
    border-right: 2px solid #3182ce;
    transform: translateY(-50%) rotate(45deg);
  }
`;

interface PortfolioCardProps {
  id: string;
  title: string;
  description: string;
  onDelete?: (id: string) => void;
  editable?: boolean; // 수정/삭제 버튼 표시 여부
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  id,
  title,
  description,
  onDelete,
  editable = false, // 기본값은 false로 설정
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 드롭다운 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 카드 클릭 처리
  const handleCardClick = () => {
    navigate(`/view/${id}`);
  };

  // 옵션 버튼 클릭 처리
  const handleOptionsClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 이벤트가 카드로 전파되지 않도록 방지
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 편집 기능 처리
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(false);
    navigate(`/edit/${id}`);
  };

  // 삭제 기능 처리
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(false);
    if (onDelete) {
      if (window.confirm("정말로 이 포트폴리오를 삭제하시겠습니까?")) {
        onDelete(id);
      }
    }
  };

  return (
    <CardContainer onClick={handleCardClick}>
      {editable && (
        <>
          <OptionsButton onClick={handleOptionsClick} aria-label="포트폴리오 옵션">
            <DotsContainer>
              <Dot />
              <Dot />
              <Dot />
            </DotsContainer>
          </OptionsButton>
          
          <DropdownMenu isOpen={isDropdownOpen} ref={dropdownRef}>
            <DropdownItem onClick={handleEdit}>
              <IconContainer>
                <EditIcon />
              </IconContainer>
              수정
            </DropdownItem>
            <DropdownItem onClick={handleDelete}>
              <IconContainer>
                <DeleteIcon />
              </IconContainer>
              삭제
            </DropdownItem>
          </DropdownMenu>
        </>
      )}
      
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <ViewIndicator className="view-indicator" />
    </CardContainer>
  );
};

export default PortfolioCard;
