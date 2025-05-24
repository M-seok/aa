import React from "react";
import styled from "styled-components";
import { ContentArea, ContentContainer, SectionTitle } from "./CommonStyles";

// 프로필 섹션 스타일 (첫 번째 섹션)
const ProfileSectionContainer = styled(ContentArea)`
  justify-content: center;
  background: #f5f7fa;
  min-height: 520px;
`;

const ProfileContentContainer = styled(ContentContainer)`
  border: 3px solid #3182ce;
  box-sizing: border-box;
`;

// 프로필 컨테이너
const ProfileContainer = styled.div`
  display: flex;
  gap: 100px;
  align-items: center;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 70px 0;
`;

// 프로필 이미지
const ProfileImage = styled.div`
  width: 240px;
  height: 320px;
  border-radius: 32px;
  background-color: #e2e8f0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 5px solid #3182ce;
  box-shadow: 0 8px 32px rgba(49, 130, 206, 0.12);
`;

// 프로필 이미지 (실제 이미지)
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 프로필 정보
const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// 이름
const Name = styled.h2`
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 28px;
  color: #2d3748;
  letter-spacing: -1.5px;
`;

// 기본 정보
const BasicInfo = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 22px;
`;

// 기본 정보 항목
const InfoItem = styled.span`
  font-size: 1.7rem;
  color: #4a5568;
  font-weight: 600;
`;

// 한줄 자기소개
const Introduction = styled.p`
  font-size: 1.7rem;
  color: #2d3748;
  margin-top: 32px;
  margin-bottom: 20px;
  line-height: 1.8;
  font-weight: 500;
`;

// 연락처 정보
const ContactInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  margin-top: 18px;
`;

// 연락처 항목
const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #edf2f7;
  padding: 16px 32px;
  border-radius: 36px;
  font-size: 1.25rem;
  font-weight: 600;
  box-shadow: 0 2px 12px rgba(49, 130, 206, 0.06);
`;

// SNS 버튼 래퍼
const SnsButtonWrapper = styled.div`
  display: flex;
  gap: 28px;
  margin-top: 18px;
`;

interface SnsItem {
  type: 'github' | 'instagram';
  url: string;
}

interface ProfileSectionProps {
  profile: {
    name: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    introduction: string;
    sns: SnsItem[];
    image: string;
  };
}

// SNS 버튼
const SnsButton = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #e6f0ff;
  color: #2563eb;
  padding: 16px 32px;
  border-radius: 36px;
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 2px 12px rgba(49, 130, 206, 0.06);
  &:hover {
    background: #2563eb;
    color: #fff;
  }
`;

const SnsIcon = ({ type }: { type: string }) => {
  if (type === 'github') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" fill="currentColor"/>
      </svg>
    );
  }
  if (type === 'instagram') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
      </svg>
    );
  }
  return null;
};

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  return (
    <ProfileSectionContainer>
      <ProfileContentContainer>
        <SectionTitle>프로필</SectionTitle>
        <ProfileContainer>
          <ProfileImage>
            {profile.image ? (
              <Image src={profile.image} alt={profile.name} />
            ) : (
              <svg width="80" height="120" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="40" cy="40" rx="28" ry="28" fill="#A0AEC0"/>
                <rect x="12" y="70" width="56" height="40" rx="18" fill="#A0AEC0"/>
              </svg>
            )}
          </ProfileImage>
          <ProfileInfo>
            <Name>{profile.name}</Name>
            <BasicInfo>
              <InfoItem>{profile.age}세</InfoItem>
              <InfoItem>{profile.gender}</InfoItem>
            </BasicInfo>
            <Introduction>{profile.introduction}</Introduction>
            <ContactInfo>
              <ContactItem>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {profile.email}
              </ContactItem>
              <ContactItem>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {profile.phone}
              </ContactItem>
            </ContactInfo>
            {profile.sns && profile.sns.length > 0 && (
              <SnsButtonWrapper>
                {profile.sns.map((sns, idx) => (
                  <SnsButton key={sns.type + idx} href={sns.url} target="_blank" rel="noopener noreferrer">
                    <SnsIcon type={sns.type} />
                    {sns.type === 'github' && 'GitHub'}
                    {sns.type === 'instagram' && 'Instagram'}
                  </SnsButton>
                ))}
              </SnsButtonWrapper>
            )}
          </ProfileInfo>
        </ProfileContainer>
      </ProfileContentContainer>
    </ProfileSectionContainer>
  );
};

export default ProfileSection;
