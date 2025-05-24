import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MyPortfolio, AllPortfolio } from "../components/portfolio";

// 섹션 컨테이너 스타일
const Section = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;
  position: relative;
`;

// 스크롤 컨테이너
const ScrollContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
`;

// 공통 컨텐츠 영역 스타일
const ContentArea = styled.div`
  flex: 1;
  padding: 20px 0;
  overflow-y: visible; /* auto에서 visible로 변경 */
`;

// 첫 번째 섹션 컨텐츠 영역 (중앙 정렬)
const CenteredContentArea = styled(ContentArea)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -40px; /* 헤더에서 더 멀어지게 위쪽 마진 추가 */
  z-index: 1;
`;

// 네비게이션 도트
const DotNavigation = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#1a202c" : "#ccc")};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#1a202c" : "#999")};
  }
`;

// 더미 데이터 (예시용)
const myPortfolios = Array(10)
  .fill(null)
  .map((_, index) => ({
    id: `my-${index + 1}`,
    title: `내 포트폴리오 ${index + 1}`,
    description:
      "포트폴리오 설명입니다. 이 포트폴리오는 간단한 설명을 포함하고 있습니다. 여기에 더 많은 내용을 추가할 수 있습니다.",
  }));

const allPortfolios = Array(30)
  .fill(null)
  .map((_, index) => ({
    id: `all-${index + 1}`,
    title: `포트폴리오 ${index + 1}`,
    description:
      "포트폴리오 설명입니다. 이 포트폴리오는 간단한 설명을 포함하고 있습니다.",
  }));

const MainPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // 휠 이벤트 처리
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // 이벤트 전파 방지
      event.preventDefault();

      // 휠 방향 감지
      const isScrollingDown = event.deltaY > 0;

      if (isScrollingDown && activeSection === 0) {
        // 첫 번째 섹션에서 아래로 스크롤 시 두 번째 섹션으로 이동
        setActiveSection(1);
        sectionRefs[1].current?.scrollIntoView({ behavior: "smooth" });
      } else if (!isScrollingDown && activeSection === 1) {
        // 두 번째 섹션에서 위로 스크롤 시 첫 번째 섹션으로 이동
        setActiveSection(0);
        sectionRefs[0].current?.scrollIntoView({ behavior: "smooth" });
      }
    };

    // 스크롤 컨테이너에 이벤트 리스너 추가
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [activeSection]);

  // 섹션 네비게이션
  const navigateToSection = (index: number) => {
    setActiveSection(index);
    sectionRefs[index].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageLayout>
      <ScrollContainer ref={scrollContainerRef}>
        {/* 첫 번째 섹션: 헤더 + 내 포트폴리오 (중앙 정렬) */}
        <Section ref={sectionRefs[0]}>
          <Header />
          <CenteredContentArea>
            <MyPortfolio portfolios={myPortfolios} />
          </CenteredContentArea>
        </Section>

        {/* 두 번째 섹션: 전체 포트폴리오 + 푸터 */}
        <Section ref={sectionRefs[1]}>
          <ContentArea>
            <AllPortfolio portfolios={allPortfolios} itemsPerPage={10} />
          </ContentArea>
          <Footer />
        </Section>
      </ScrollContainer>

      {/* 네비게이션 도트 */}
      <DotNavigation>
        {sectionRefs.map((_, index) => (
          <Dot
            key={index}
            active={activeSection === index}
            onClick={() => navigateToSection(index)}
          />
        ))}
      </DotNavigation>
    </PageLayout>
  );
};

export default MainPage;
