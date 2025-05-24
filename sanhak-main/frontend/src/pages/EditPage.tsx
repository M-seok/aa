import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import EditPageLayout from "../components/EditPageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  ProfileEditSection,
  ExperienceEditSection,
  ProjectEditSection,
  AboutEditSection,
} from "../components/portfolio/edit";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(
    100vh - 250px
  ); /* 헤더와 푸터 높이를 고려한 최소 높이 설정 */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2d3748;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 2px solid #e2e8f0;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 15px 25px;
  background: none;
  border: none;
  border-bottom: 3px solid
    ${(props) => (props.active ? "#3182ce" : "transparent")};
  color: ${(props) => (props.active ? "#3182ce" : "#4a5568")};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #3182ce;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
`;

const CancelButton = styled(Button)`
  background-color: #e2e8f0;
  color: #4a5568;
  border: none;

  &:hover {
    background-color: #cbd5e0;
  }
`;

const SaveButton = styled(Button)`
  background-color: #3182ce;
  color: white;
  border: none;

  &:hover {
    background-color: #2c5282;
  }
`;

interface SnsItem {
  type: string;
  url: string;
}

interface ProfileData {
  name: string;
  birthDate: string;
  gender: string;
  email: string;
  phone: string;
  introduction: string;
  image: string | null;
  sns: SnsItem[];
}

// 더미 프로필 데이터
const dummyProfileData: ProfileData = {
  name: "고재우",
  birthDate: "2000-01-01",
  gender: "남성",
  email: "jumokcom2001@gmail.com",
  phone: "010-9352-1321",
  introduction: "안녕하세요 풀스택 개발자 고재우입니다.",
  image: null,
  sns: [
    { type: "github", url: "https://github.com/honggildong" },
    { type: "instagram", url: "https://instagram.com/honggildong" },
  ],
};

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  // 포트폴리오 데이터 상태
  const [profileData, setProfileData] = useState<ProfileData>(dummyProfileData);

  // 포트폴리오 ID가 있으면 데이터 로드
  useEffect(() => {
    if (id) {
      // 실제로는 API 호출로 데이터를 가져와야 함
      // 여기서는 더미 데이터 사용
      setProfileData(dummyProfileData);
    }
  }, [id]);

  // 프로필 데이터 저장 핸들러
  const handleSaveProfile = (data: ProfileData) => {
    setProfileData(data);
    // 실제로는 API 호출로 데이터를 저장해야 함
    console.log("저장된 프로필 데이터:", data);
  };

  // 취소 버튼 핸들러
  const handleCancel = () => {
    navigate("/");
  };

  // 전체 저장 버튼 핸들러
  const handleSaveAll = () => {
    // 실제로는 API 호출로 모든 데이터를 저장해야 함
    console.log("모든 데이터 저장");
    navigate("/");
  };

  // 뒤로가기 버튼 핸들러
  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <EditPageLayout>
      <Header />
      <Container>
        <Title>{id ? "포트폴리오 수정" : "새 포트폴리오 만들기"}</Title>

        <TabsContainer>
          <Tab
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          >
            프로필
          </Tab>
          <Tab
            active={activeTab === "experience"}
            onClick={() => setActiveTab("experience")}
          >
            이력
          </Tab>
          <Tab
            active={activeTab === "projects"}
            onClick={() => setActiveTab("projects")}
          >
            프로젝트
          </Tab>
          <Tab
            active={activeTab === "about"}
            onClick={() => setActiveTab("about")}
          >
            자기소개
          </Tab>
        </TabsContainer>

        {activeTab === "profile" && (
          <ProfileEditSection
            initialData={profileData}
            onSave={handleSaveProfile}
          />
        )}

        {activeTab === "experience" && <ExperienceEditSection />}

        {activeTab === "projects" && <ProjectEditSection />}

        {activeTab === "about" && <AboutEditSection />}

        <ActionButtons>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
          <SaveButton onClick={handleSaveAll}>모두 저장</SaveButton>
        </ActionButtons>
      </Container>
      <Footer />
    </EditPageLayout>
  );
};

export default EditPage;
