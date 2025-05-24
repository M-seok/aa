import React from "react";
import styled from "styled-components";
import { ContentArea, ContentContainer, SectionTitle } from "./CommonStyles";

const AboutMeContentContainer = styled(ContentContainer)`
  border: 3px solid #3182ce;
  box-sizing: border-box;
`;

const AboutMeGrid = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 24px;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const AboutMeCard = styled.div`
  flex: 1;
  background: #f8fafc;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(49, 130, 206, 0.06);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  border: 2px solid #3182ce;
  height: 500px;
`;

const AboutMeCardTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  color: #3182ce;
  margin-bottom: 18px;
`;

const AboutMeCardContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #4a5568;
  white-space: pre-line;
`;

interface AboutMeSectionProps {
  content: {
    growth: string;
    personality: string;
    experience: string;
  };
}

const AboutMeSection: React.FC<AboutMeSectionProps> = ({ content }) => {
  return (
    <ContentArea>
      <AboutMeContentContainer>
        <SectionTitle>자기소개</SectionTitle>
        <AboutMeGrid>
          <AboutMeCard>
            <AboutMeCardTitle>성장과정</AboutMeCardTitle>
            <AboutMeCardContent>{content.growth}</AboutMeCardContent>
          </AboutMeCard>
          <AboutMeCard>
            <AboutMeCardTitle>성격소개</AboutMeCardTitle>
            <AboutMeCardContent>{content.personality}</AboutMeCardContent>
          </AboutMeCard>
          <AboutMeCard>
            <AboutMeCardTitle>핵심경험</AboutMeCardTitle>
            <AboutMeCardContent>{content.experience}</AboutMeCardContent>
          </AboutMeCard>
        </AboutMeGrid>
      </AboutMeContentContainer>
    </ContentArea>
  );
};

export default AboutMeSection;
