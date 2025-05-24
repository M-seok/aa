import React, { useState } from "react";
import styled from "styled-components";
import EducationForm from "./forms/EducationForm";
import CareerForm from "./forms/CareerForm";
import CertificateForm from "./forms/CertificateForm";
import LanguageForm from "./forms/LanguageForm";
import AwardForm from "./forms/AwardForm";

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

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 2px solid #e2e8f0;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 12px 20px;
  background: none;
  border: none;
  border-bottom: 3px solid ${(props) => (props.active ? "#3182ce" : "transparent")};
  color: ${(props) => (props.active ? "#3182ce" : "#4a5568")};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: #3182ce;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  background-color: #f7fafc;
  border-radius: 8px;
  border: 2px dashed #cbd5e0;
  max-width: 800px;
  margin: 0 auto;
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

// 인터페이스 정의
interface EducationItem {
  id: string;
  school: string;
  major: string;
  degree: string;
  startDate: string;
  endDate: string;
  isAttending: boolean;
  description: string;
}

interface CareerItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isWorking: boolean;
  description: string;
}

interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

interface LanguageItem {
  id: string;
  language: string;
  testName: string;
  score: string;
  date: string;
}

interface AwardItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
}

// 인터페이스
interface ExperienceEditSectionProps {
  // 여기에 필요한 props 정의
}

const ExperienceEditSection: React.FC<ExperienceEditSectionProps> = () => {
  const [activeTab, setActiveTab] = useState("education");
  
  // 폼 상태
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showCareerForm, setShowCareerForm] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [showLanguageForm, setShowLanguageForm] = useState(false);
  const [showAwardForm, setShowAwardForm] = useState(false);
  
  // 항목 데이터
  const [educationItems, setEducationItems] = useState<EducationItem[]>([]);
  const [careerItems, setCareerItems] = useState<CareerItem[]>([]);
  const [certificateItems, setCertificateItems] = useState<CertificateItem[]>([]);
  const [languageItems, setLanguageItems] = useState<LanguageItem[]>([]);
  const [awardItems, setAwardItems] = useState<AwardItem[]>([]);
  
  // 학력 추가
  const handleAddEducation = (data: Omit<EducationItem, 'id'>) => {
    const newItem: EducationItem = {
      ...data,
      id: Date.now().toString()
    };
    setEducationItems([...educationItems, newItem]);
    setShowEducationForm(false);
  };
  
  // 경력 추가
  const handleAddCareer = (data: Omit<CareerItem, 'id'>) => {
    const newItem: CareerItem = {
      ...data,
      id: Date.now().toString()
    };
    setCareerItems([...careerItems, newItem]);
    setShowCareerForm(false);
  };
  
  // 자격증 추가
  const handleAddCertificate = (data: Omit<CertificateItem, 'id'>) => {
    const newItem: CertificateItem = {
      ...data,
      id: Date.now().toString()
    };
    setCertificateItems([...certificateItems, newItem]);
    setShowCertificateForm(false);
  };
  
  // 어학능력 추가
  const handleAddLanguage = (data: Omit<LanguageItem, 'id'>) => {
    const newItem: LanguageItem = {
      ...data,
      id: Date.now().toString()
    };
    setLanguageItems([...languageItems, newItem]);
    setShowLanguageForm(false);
  };
  
  // 수상내역 추가
  const handleAddAward = (data: Omit<AwardItem, 'id'>) => {
    const newItem: AwardItem = {
      ...data,
      id: Date.now().toString()
    };
    setAwardItems([...awardItems, newItem]);
    setShowAwardForm(false);
  };
  
  // 항목 삭제 함수
  const handleDeleteEducation = (id: string) => {
    setEducationItems(educationItems.filter(item => item.id !== id));
  };
  
  const handleDeleteCareer = (id: string) => {
    setCareerItems(careerItems.filter(item => item.id !== id));
  };
  
  const handleDeleteCertificate = (id: string) => {
    setCertificateItems(certificateItems.filter(item => item.id !== id));
  };
  
  const handleDeleteLanguage = (id: string) => {
    setLanguageItems(languageItems.filter(item => item.id !== id));
  };
  
  const handleDeleteAward = (id: string) => {
    setAwardItems(awardItems.filter(item => item.id !== id));
  };

  return (
    <Container>
      <Title>이력 정보</Title>
      
      <TabsContainer>
        <Tab 
          active={activeTab === "education"} 
          onClick={() => setActiveTab("education")}
        >
          학력
        </Tab>
        <Tab 
          active={activeTab === "career"} 
          onClick={() => setActiveTab("career")}
        >
          경력
        </Tab>
        <Tab 
          active={activeTab === "certificate"} 
          onClick={() => setActiveTab("certificate")}
        >
          자격증
        </Tab>
        <Tab 
          active={activeTab === "language"} 
          onClick={() => setActiveTab("language")}
        >
          어학능력
        </Tab>
        <Tab 
          active={activeTab === "award"} 
          onClick={() => setActiveTab("award")}
        >
          수상내역
        </Tab>
      </TabsContainer>

      {activeTab === "education" && (
        <>
          {educationItems.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              {educationItems.map((item) => (
                <div key={item.id} className="item-card" style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '10px',
                  backgroundColor: 'white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  maxWidth: '800px',
                  margin: '0 auto 10px auto'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>{item.school}</h3>
                    <button 
                      onClick={() => handleDeleteEducation(item.id)}
                      style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer' }}
                    >
                      ✕
                    </button>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                    <p style={{ margin: '4px 0' }}><strong>전공:</strong> {item.major}</p>
                    <p style={{ margin: '4px 0' }}><strong>학위:</strong> {item.degree}</p>
                    <p style={{ margin: '4px 0' }}><strong>기간:</strong> {item.startDate} ~ {item.isAttending ? '현재' : item.endDate}</p>
                    {item.description && <p style={{ margin: '4px 0' }}><strong>설명:</strong> {item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {showEducationForm ? (
            <EducationForm 
              onSave={handleAddEducation} 
              onCancel={() => setShowEducationForm(false)} 
            />
          ) : (
            <EmptyState>
              {educationItems.length > 0 ? (
                <AddButton onClick={() => setShowEducationForm(true)}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  학력 추가
                </AddButton>
              ) : (
                <>
                  <EmptyStateText>등록된 학력 정보가 없습니다. 추가 버튼을 클릭하여 정보를 등록해보세요.</EmptyStateText>
                  <AddButton onClick={() => setShowEducationForm(true)}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    학력 추가
                  </AddButton>
                </>
              )}
            </EmptyState>
          )}
        </>
      )}

      {activeTab === "career" && (
        <>
          {careerItems.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              {careerItems.map((item) => (
                <div key={item.id} className="item-card" style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '12px',
                  backgroundColor: 'white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>{item.company}</h3>
                    <button 
                      onClick={() => handleDeleteCareer(item.id)}
                      style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer' }}
                    >
                      ✕
                    </button>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                    <p style={{ margin: '4px 0' }}><strong>직책:</strong> {item.position}</p>
                    <p style={{ margin: '4px 0' }}><strong>기간:</strong> {item.startDate} ~ {item.isWorking ? '현재' : item.endDate}</p>
                    {item.description && <p style={{ margin: '4px 0' }}><strong>업무 설명:</strong> {item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {showCareerForm ? (
            <CareerForm 
              onSave={handleAddCareer} 
              onCancel={() => setShowCareerForm(false)} 
            />
          ) : (
            <EmptyState>
              {careerItems.length > 0 ? (
                <AddButton onClick={() => setShowCareerForm(true)}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  경력 추가
                </AddButton>
              ) : (
                <>
                  <EmptyStateText>등록된 경력 정보가 없습니다. 추가 버튼을 클릭하여 정보를 등록해보세요.</EmptyStateText>
                  <AddButton onClick={() => setShowCareerForm(true)}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    경력 추가
                  </AddButton>
                </>
              )}
            </EmptyState>
          )}
        </>
      )}

      {activeTab === "certificate" && (
        <>
          {certificateItems.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              {certificateItems.map((item) => (
                <div key={item.id} className="item-card" style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '12px',
                  backgroundColor: 'white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>{item.name}</h3>
                    <button 
                      onClick={() => handleDeleteCertificate(item.id)}
                      style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer' }}
                    >
                      ✕
                    </button>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                    <p style={{ margin: '4px 0' }}><strong>발급기관:</strong> {item.issuer}</p>
                    <p style={{ margin: '4px 0' }}><strong>취득일:</strong> {item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {showCertificateForm ? (
            <CertificateForm 
              onSave={handleAddCertificate} 
              onCancel={() => setShowCertificateForm(false)} 
            />
          ) : (
            <EmptyState>
              {certificateItems.length > 0 ? (
                <AddButton onClick={() => setShowCertificateForm(true)}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  자격증 추가
                </AddButton>
              ) : (
                <>
                  <EmptyStateText>등록된 자격증 정보가 없습니다. 추가 버튼을 클릭하여 정보를 등록해보세요.</EmptyStateText>
                  <AddButton onClick={() => setShowCertificateForm(true)}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    자격증 추가
                  </AddButton>
                </>
              )}
            </EmptyState>
          )}
        </>
      )}

      {activeTab === "language" && (
        <>
          {languageItems.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              {languageItems.map((item) => (
                <div key={item.id} className="item-card" style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '12px',
                  backgroundColor: 'white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>{item.language}</h3>
                    <button 
                      onClick={() => handleDeleteLanguage(item.id)}
                      style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer' }}
                    >
                      ✕
                    </button>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                    <p style={{ margin: '4px 0' }}><strong>시험명:</strong> {item.testName}</p>
                    <p style={{ margin: '4px 0' }}><strong>점수/급수:</strong> {item.score}</p>
                    <p style={{ margin: '4px 0' }}><strong>취득일:</strong> {item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {showLanguageForm ? (
            <LanguageForm 
              onSave={handleAddLanguage} 
              onCancel={() => setShowLanguageForm(false)} 
            />
          ) : (
            <EmptyState>
              {languageItems.length > 0 ? (
                <AddButton onClick={() => setShowLanguageForm(true)}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  어학능력 추가
                </AddButton>
              ) : (
                <>
                  <EmptyStateText>등록된 어학능력 정보가 없습니다. 추가 버튼을 클릭하여 정보를 등록해보세요.</EmptyStateText>
                  <AddButton onClick={() => setShowLanguageForm(true)}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    어학능력 추가
                  </AddButton>
                </>
              )}
            </EmptyState>
          )}
        </>
      )}

      {activeTab === "award" && (
        <>
          {awardItems.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              {awardItems.map((item) => (
                <div key={item.id} className="item-card" style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '12px',
                  backgroundColor: 'white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>{item.name}</h3>
                    <button 
                      onClick={() => handleDeleteAward(item.id)}
                      style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer' }}
                    >
                      ✕
                    </button>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                    <p style={{ margin: '4px 0' }}><strong>수여기관:</strong> {item.issuer}</p>
                    <p style={{ margin: '4px 0' }}><strong>수상일:</strong> {item.date}</p>
                    {item.description && <p style={{ margin: '4px 0' }}><strong>설명:</strong> {item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {showAwardForm ? (
            <AwardForm 
              onSave={handleAddAward} 
              onCancel={() => setShowAwardForm(false)} 
            />
          ) : (
            <EmptyState>
              {awardItems.length > 0 ? (
                <AddButton onClick={() => setShowAwardForm(true)}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  수상내역 추가
                </AddButton>
              ) : (
                <>
                  <EmptyStateText>등록된 수상내역 정보가 없습니다. 추가 버튼을 클릭하여 정보를 등록해보세요.</EmptyStateText>
                  <AddButton onClick={() => setShowAwardForm(true)}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    수상내역 추가
                  </AddButton>
                </>
              )}
            </EmptyState>
          )}
        </>
      )}
    </Container>
  );
};

export default ExperienceEditSection;
