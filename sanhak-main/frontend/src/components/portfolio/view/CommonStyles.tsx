import React from "react";
import styled from "styled-components";

// 스크롤 컨테이너 스타일
export const ScrollContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
`;

// 섹션 컨테이너 스타일
export const Section = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;
  position: relative;
`;

// 섹션 컨텐츠 영역 스타일 (기본)
export const ContentArea = styled.div`
  flex: 1;
  padding: 20px 70px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

// 컨텐츠 공통 컨테이너
export const ContentContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin: 20px 0;
  flex: 1;
  overflow-y: auto;
`;

// 네비게이션 도트
export const DotNavigation = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 100;
`;

export const Dot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#3182ce" : "#cbd5e0")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#3182ce" : "#a0aec0")};
    transform: scale(1.2);
  }
`;

// 뒤로가기 버튼
export const BackButton = styled.button`
  position: absolute;
  top: 50px;
  left: 70px;
  background-color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #3182ce;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    transition: transform 0.2s ease;
    width: 30px;
    height: 30px;
  }

  &:hover svg {
    transform: translateX(-4px);
  }
`;

// 섹션 제목
export const SectionTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #2d3748;
  position: relative;
  display: inline-block;
  padding-bottom: 8px;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3px;
    background-color: #3182ce;
    border-radius: 2px;
  }
`;
