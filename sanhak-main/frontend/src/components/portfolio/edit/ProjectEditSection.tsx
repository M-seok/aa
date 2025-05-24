import React, { useState } from "react";
import styled from "styled-components";
import ProjectForm from "./forms/ProjectForm";

const Container = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin: 20px 0;
  border: 3px solid #3182ce;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 30px;
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

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: #f7fafc;
  border-radius: 8px;
  border: 2px dashed #cbd5e0;
`;

const EmptyStateText = styled.p`
  font-size: 1.1rem;
  color: #718096;
  margin-bottom: 20px;
  text-align: center;
`;

const AddButton = styled.button`
  padding: 12px 16px;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: #3182ce;
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

// 인터페이스
interface ProjectItem {
  id: string;
  title: string;
  period: string;
  startDate: string;
  endDate: string;
  isOngoing: boolean;
  role: string;
  projectScope: string;
  skills: string[];
  description: string;
  serviceUrl: string;
  githubUrl: string;
  image: string;
}

interface ProjectEditSectionProps {
  // 여기에 필요한 props 정의
}

const ItemCard = styled.div`
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ItemTitle = styled.h3`
  font-size: 1.2rem;
  color: #2d3748;
  margin: 0;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
`;

const ItemDetail = styled.p`
  margin: 0;
  color: #4a5568;
  font-size: 0.95rem;
`;

const ItemDetailLabel = styled.span`
  font-weight: 500;
  color: #718096;
  display: inline-block;
  min-width: 80px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
`;

const Tag = styled.span`
  background-color: #ebf4ff;
  color: #3182ce;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #fff5f5;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ProjectEditSection: React.FC<ProjectEditSectionProps> = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  
  // 프로젝트 추가 함수
  const handleAddProject = (projectData: Omit<ProjectItem, 'id' | 'period'>) => {
  // 프로젝트 기간 계산
  const period = `${projectData.startDate} ~ ${projectData.isOngoing ? '현재' : projectData.endDate}`;
    
    const newProject: ProjectItem = {
      ...projectData,
      id: Date.now().toString(),
      period
    };
    
    setProjects([...projects, newProject]);
    setShowProjectForm(false);
  };
  
  // 프로젝트 삭제 함수
  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  return (
    <Container>
      <Title>프로젝트</Title>
      
      {projects.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          {projects.map((project) => (
            <ItemCard key={project.id}>
              <ItemHeader>
                <ItemTitle>{project.title}</ItemTitle>
                <DeleteButton onClick={() => handleDeleteProject(project.id)}>
                  ✕
                </DeleteButton>
              </ItemHeader>
              
              <ItemInfo>
                <ItemDetail>
                  <ItemDetailLabel>역할:</ItemDetailLabel> {project.role}
                </ItemDetail>
                <ItemDetail>
                  <ItemDetailLabel>기간:</ItemDetailLabel> {project.period}
                </ItemDetail>
                <ItemDetail>
                  <ItemDetailLabel>프로젝트 범위:</ItemDetailLabel> {project.projectScope}
                </ItemDetail>
                {project.description && (
                  <ItemDetail>
                    <ItemDetailLabel>설명:</ItemDetailLabel> 
                    <div style={{ marginTop: '5px', whiteSpace: 'pre-line' }}>{project.description}</div>
                  </ItemDetail>
                )}
                
                {project.skills.length > 0 && (
                  <ItemDetail>
                    <ItemDetailLabel>기술 스택:</ItemDetailLabel>
                    <TagsContainer>
                      {project.skills.map((skill, index) => (
                        <Tag key={index}>{skill}</Tag>
                      ))}
                    </TagsContainer>
                  </ItemDetail>
                )}
                
                {(project.serviceUrl || project.githubUrl) && (
                  <ItemDetail>
                    <ItemDetailLabel>링크:</ItemDetailLabel>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                      {project.serviceUrl && (
                        <a href={project.serviceUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#3182ce' }}>
                          서비스 URL
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#3182ce' }}>
                          GitHub URL
                        </a>
                      )}
                    </div>
                  </ItemDetail>
                )}
              </ItemInfo>
            </ItemCard>
          ))}
          
          {!showProjectForm && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <AddButton onClick={() => setShowProjectForm(true)}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                프로젝트 추가
              </AddButton>
            </div>
          )}
        </div>
      )}
      
      {projects.length === 0 && !showProjectForm && (
        <EmptyState>
          <EmptyStateText>등록된 프로젝트가 없습니다. 추가 버튼을 클릭하여 프로젝트를 등록해보세요.</EmptyStateText>
          <AddButton onClick={() => setShowProjectForm(true)}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            프로젝트 추가
          </AddButton>
        </EmptyState>
      )}
      
      {showProjectForm && (
        <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: '0', marginBottom: '20px', color: '#3182ce' }}>프로젝트 추가</h3>
          <ProjectForm 
            onSave={handleAddProject} 
            onCancel={() => setShowProjectForm(false)} 
          />
        </div>
      )}
    </Container>
  );
};

export default ProjectEditSection;
