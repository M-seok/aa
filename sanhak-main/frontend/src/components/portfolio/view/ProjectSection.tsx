import React, { useState } from "react";
import styled from "styled-components";
import { ContentArea, ContentContainer, SectionTitle } from "./CommonStyles";

// 프로젝트 그리드
const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

// 프로젝트 카드
const ProjectCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  height: 350px;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

// 프로젝트 이미지
const ProjectImage = styled.div`
  height: 160px;
  background-color: #e2e8f0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

// 프로젝트 정보
const ProjectInfo = styled.div`
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// 프로젝트 제목
const ProjectTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #2d3748;
  font-weight: 600;
`;

// 프로젝트 기간
const ProjectPeriod = styled.div`
  font-size: 0.9rem;
  color: #718096;
  margin-bottom: 8px;
`;

// 프로젝트 역할
const ProjectRole = styled.div`
  font-size: 0.9rem;
  color: #4a5568;
  margin-bottom: 10px;
  font-weight: 500;
`;

// 프로젝트 설명
const ProjectDescription = styled.p`
  font-size: 0.9rem;
  color: #4a5568;
  line-height: 1.4;
  margin-bottom: 15px;
`;

// 기술 태그 컨테이너
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`;

// 기술 태그
const Tag = styled.span`
  background-color: #ebf4ff;
  color: #3182ce;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectContentContainer = styled(ContentContainer)`
  border: 3px solid #3182ce;
  box-sizing: border-box;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ModalImage = styled.div`
  width: 100%;
  height: 300px;
  background-color: #e2e8f0;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 15px;
  font-weight: 600;
`;

const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const InfoLabel = styled.span`
  font-size: 1rem;
  color: #4a5568;
  font-weight: 600;
  min-width: 100px;
`;

const InfoContent = styled.span`
  font-size: 1rem;
  color: #2d3748;
  flex: 1;
`;

const ModalDescription = styled.div`
  margin-bottom: 25px;
`;

const DescriptionTitle = styled.h4`
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 10px;
  font-weight: 600;
`;

const DescriptionContent = styled.p`
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.6;
  white-space: pre-line;
`;

const ModalLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #3182ce;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2c5282;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #718096;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: #2d3748;
  }
`;

const ProjectSectionTitle = styled.h3`
  font-size: 1.4rem;
  color: #2d3748;
  margin: 30px 0 15px;
  font-weight: 600;
  padding-bottom: 8px;
  border-bottom: 2px solid #e2e8f0;
`;

const ProjectTabs = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 10px;
`;

const ProjectTab = styled.button<{ isActive: boolean }>`
  padding: 8px 0;
  border: none;
  background: none;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${props => props.isActive ? '#3182ce' : '#718096'};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.isActive ? '#3182ce' : 'transparent'};
    transition: background-color 0.2s ease;
  }

  &:hover {
    color: ${props => props.isActive ? '#3182ce' : '#4a5568'};
  }
`;

interface Project {
  id: number;
  title: string;
  period: string;
  role: string;
  skills: string[];
  description: string;
  serviceUrl?: string;
  githubUrl?: string;
  image: string;
  isTeamProject: boolean;
}

interface ProjectSectionProps {
  projects: Project[];
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'team' | 'single'>('all');

  const teamProjects = projects.filter(project => project.isTeamProject);
  const singleProjects = projects.filter(project => !project.isTeamProject);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const renderProjectCard = (project: Project) => (
    <ProjectCard 
      key={project.id}
      onClick={() => handleProjectClick(project)}
    >
      <ProjectImage>
        {project.image ? (
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 16L8.58579 11.4142C9.36683 10.6332 10.6332 10.6332 11.4142 11.4142L16 16M14 14L15.5858 12.4142C16.3668 11.6332 17.6332 11.6332 18.4142 12.4142L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </ProjectImage>
      <ProjectInfo>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectPeriod>{project.period}</ProjectPeriod>
        <ProjectRole>{project.role}</ProjectRole>
        <TagContainer>
          {project.skills.map((skill, index) => (
            <Tag key={index}>{skill}</Tag>
          ))}
        </TagContainer>
      </ProjectInfo>
    </ProjectCard>
  );

  const renderProjects = () => {
    switch (activeTab) {
      case 'team':
        return teamProjects.map(renderProjectCard);
      case 'single':
        return singleProjects.map(renderProjectCard);
      default:
        return projects.map(renderProjectCard);
    }
  };

  return (
    <ContentArea>
      <ProjectContentContainer>
        <SectionTitle>프로젝트</SectionTitle>
        
        <ProjectTabs>
          <ProjectTab 
            isActive={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
          >
            All
          </ProjectTab>
          <ProjectTab 
            isActive={activeTab === 'team'} 
            onClick={() => setActiveTab('team')}
          >
            Team
          </ProjectTab>
          <ProjectTab 
            isActive={activeTab === 'single'} 
            onClick={() => setActiveTab('single')}
          >
            Single
          </ProjectTab>
        </ProjectTabs>

        <ProjectGrid>
          {renderProjects()}
        </ProjectGrid>
      </ProjectContentContainer>

      {selectedProject && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
            <ModalImage>
              {selectedProject.image ? (
                <img src={selectedProject.image} alt={selectedProject.title} />
              ) : (
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 16L8.58579 11.4142C9.36683 10.6332 10.6332 10.6332 11.4142 11.4142L16 16M14 14L15.5858 12.4142C16.3668 11.6332 17.6332 11.6332 18.4142 12.4142L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </ModalImage>
            <ModalTitle>{selectedProject.title}</ModalTitle>
            
            <ModalInfo>
              <InfoRow>
                <InfoLabel>프로젝트 기간</InfoLabel>
                <InfoContent>{selectedProject.period}</InfoContent>
              </InfoRow>
              <InfoRow>
                <InfoLabel>담당 역할</InfoLabel>
                <InfoContent>{selectedProject.role}</InfoContent>
              </InfoRow>
              <InfoRow>
                <InfoLabel>사용 기술</InfoLabel>
                <InfoContent>
                  <TagContainer>
                    {selectedProject.skills.map((skill, index) => (
                      <Tag key={index}>{skill}</Tag>
                    ))}
                  </TagContainer>
                </InfoContent>
              </InfoRow>
            </ModalInfo>

            <ModalDescription>
              <DescriptionTitle>프로젝트 소개</DescriptionTitle>
              <DescriptionContent>{selectedProject.description}</DescriptionContent>
            </ModalDescription>

            <ModalLinks>
              {selectedProject.serviceUrl && (
                <LinkButton href={selectedProject.serviceUrl} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  서비스 보기
                </LinkButton>
              )}
              {selectedProject.githubUrl && (
                <LinkButton href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </LinkButton>
              )}
            </ModalLinks>
          </ModalContent>
        </ModalOverlay>
      )}
    </ContentArea>
  );
};

export default ProjectSection;
