import React from "react";
import styled from "styled-components";
import { ContentArea, ContentContainer, SectionTitle } from "./CommonStyles";

const ExperienceContentContainer = styled(ContentContainer)`
  border: 3px solid #3182ce;
  box-sizing: border-box;
`;

const ExperienceLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding: 20px;
`;

// 왼쪽 영역 스타일
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #3182ce;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #3182ce;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  flex-wrap: wrap;
`;

const CardItem = styled.div`
  padding: 15px;
  border-radius: 8px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #2d3748;
`;

const ItemSubtitle = styled.div`
  font-size: 0.9rem;
  color: #4a5568;
`;

const ItemDate = styled.div`
  font-size: 0.9rem;
  color: #3182ce;
  font-weight: 500;
`;

// 오른쪽 타임라인 영역 스타일
const RightSection = styled.div`
  position: relative;
  padding-left: 30px;
`;

const TimelineContainer = styled.div`
  position: relative;
  padding: 20px 0;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: #3182ce;
  }
`;

const TimelineItem = styled.div`
  margin-bottom: 30px;
  padding-left: 30px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: -6px;
    top: 5px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #3182ce;
    border: 3px solid white;
    box-shadow: 0 0 0 3px #3182ce;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Period = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #3182ce;
  margin-bottom: 5px;
`;

const Organization = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Description = styled.div`
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.5;
`;

interface Experience {
  id: number;
  period: string;
  organization: string;
  role: string;
  description: string;
}

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
}

interface Language {
  id: number;
  name: string;
  level: string;
  score?: string;
}

interface Award {
  id: number;
  name: string;
  issuer: string;
  date: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
  certificates: Certificate[];
  languages: Language[];
  awards: Award[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  certificates,
  languages,
  awards,
}) => {
  return (
    <ContentArea>
      <ExperienceContentContainer>
        <SectionTitle>이력</SectionTitle>
        <ExperienceLayout>
          <LeftSection>
            <Card>
              <CardTitle>자격증</CardTitle>
              <CardContent>
                {certificates.map((cert) => (
                  <CardItem key={cert.id}>
                    <ItemTitle>{cert.name}</ItemTitle>
                    <ItemSubtitle>{cert.issuer}</ItemSubtitle>
                    <ItemDate>{cert.date}</ItemDate>
                  </CardItem>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardTitle>어학능력</CardTitle>
              <CardContent>
                {languages.map((lang) => (
                  <CardItem key={lang.id}>
                    <ItemTitle>{lang.name}</ItemTitle>
                    <ItemSubtitle>{lang.level}</ItemSubtitle>
                    {lang.score && <ItemDate>{lang.score}</ItemDate>}
                  </CardItem>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardTitle>수상내역</CardTitle>
              <CardContent>
                {awards.map((award) => (
                  <CardItem key={award.id}>
                    <ItemTitle>{award.name}</ItemTitle>
                    <ItemSubtitle>{award.issuer}</ItemSubtitle>
                    <ItemDate>{award.date}</ItemDate>
                  </CardItem>
                ))}
              </CardContent>
            </Card>
          </LeftSection>
          <RightSection>
            <Card>
              <CardTitle>학력</CardTitle>
              <TimelineContainer>
                {experiences
                  .filter((exp) => exp.role === "학력")
                  .map((exp) => (
                    <TimelineItem key={exp.id}>
                      <Period>{exp.period}</Period>
                      <Organization>{exp.organization}</Organization>
                      <Description>{exp.description}</Description>
                    </TimelineItem>
                  ))}
              </TimelineContainer>
            </Card>
            <Card>
              <CardTitle>경력</CardTitle>
              <TimelineContainer>
                {experiences
                  .filter((exp) => exp.role === "경력")
                  .map((exp) => (
                    <TimelineItem key={exp.id}>
                      <Period>{exp.period}</Period>
                      <Organization>{exp.organization}</Organization>
                      <Description>{exp.description}</Description>
                    </TimelineItem>
                  ))}
              </TimelineContainer>
            </Card>
          </RightSection>
        </ExperienceLayout>
      </ExperienceContentContainer>
    </ContentArea>
  );
};

export default ExperienceSection;
