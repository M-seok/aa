import React, { useState, useRef, ChangeEvent } from "react";
import styled from "styled-components";

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 250px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #4a5568;
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  font-size: 1rem;
  color: #2d3748;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  font-size: 1rem;
  color: #2d3748;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  font-size: 1rem;
  color: #2d3748;
  background-color: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
  }
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 300px;
`;

const ImagePreview = styled.div`
  width: 240px;
  height: 320px;
  border-radius: 10px;
  border: 3px dashed #cbd5e0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #f7fafc;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3182ce;
    background-color: #ebf8ff;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UploadButton = styled.button`
  padding: 12px 16px;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #2c5282;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const SnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AddSnsButton = styled.button`
  padding: 10px 16px;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-start;
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

const SnsRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const RemoveSnsButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fc8181;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e53e3e;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SaveButton = styled.button`
  padding: 16px;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 20px;

  &:hover {
    background-color: #2c5282;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

// SNS 유형 옵션
const snsOptions = [
  { value: "github", label: "GitHub" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter" },
];

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

interface ProfileEditSectionProps {
  initialData?: ProfileData;
  onSave: (data: ProfileData) => void;
}

const ProfileEditSection: React.FC<ProfileEditSectionProps> = ({
  initialData,
  onSave,
}) => {
  // 기본 초기값 설정
  const defaultData: ProfileData = {
    name: "",
    birthDate: "",
    gender: "",
    email: "",
    phone: "",
    introduction: "",
    image: null,
    sns: [],
  };

  // 초기 데이터가 제공되면 사용, 아니면 기본값 사용
  const [profileData, setProfileData] = useState<ProfileData>(
    initialData || defaultData
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 파일 미리보기 URL
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    profileData.image || null
  );

  // 입력 필드 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // 이미지 업로드 클릭 핸들러
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 이미지 파일 변경 핸들러
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 미리보기 URL 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
      setProfileData({ ...profileData, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  // SNS 추가 핸들러
  const handleAddSns = () => {
    setProfileData({
      ...profileData,
      sns: [...profileData.sns, { type: "github", url: "" }],
    });
  };

  // SNS 삭제 핸들러
  const handleRemoveSns = (index: number) => {
    const newSns = [...profileData.sns];
    newSns.splice(index, 1);
    setProfileData({ ...profileData, sns: newSns });
  };

  // SNS 정보 변경 핸들러
  const handleSnsChange = (index: number, field: string, value: string) => {
    const newSns = [...profileData.sns];
    newSns[index] = { ...newSns[index], [field]: value };
    setProfileData({ ...profileData, sns: newSns });
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profileData);
  };

  return (
    <Container>
      <Title>프로필 편집</Title>
      <Form onSubmit={handleSubmit}>
        <Row>
          <ImageUploadContainer>
            <Label>증명사진</Label>
            <ImagePreview onClick={handleImageClick}>
              {previewUrl ? (
                <img src={previewUrl} alt="Profile Preview" />
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4V20"
                      stroke="#A0AEC0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 12H20"
                      stroke="#A0AEC0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </ImagePreview>
            <HiddenInput
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <UploadButton type="button" onClick={handleImageClick}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "8px" }}
              >
                <path
                  d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 8L12 3L7 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 3V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              증명사진 업로드
            </UploadButton>
          </ImageUploadContainer>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <InputGroup>
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={profileData.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
                required
              />
            </InputGroup>

            <Row>
              <InputGroup>
                <Label htmlFor="birthDate">생년월일</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={profileData.birthDate}
                  onChange={handleChange}
                  required
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="gender">성별</Label>
                <Select
                  id="gender"
                  name="gender"
                  value={profileData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">선택하세요</option>
                  <option value="남성">남성</option>
                  <option value="여성">여성</option>
                </Select>
              </InputGroup>
            </Row>

            <Row>
              <InputGroup>
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleChange}
                  placeholder="example@domain.com"
                  required
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="phone">전화번호</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  required
                />
              </InputGroup>
            </Row>
          </div>
        </Row>

        <InputGroup>
          <Label htmlFor="introduction">한줄 자기소개</Label>
          <TextArea
            id="introduction"
            name="introduction"
            value={profileData.introduction}
            onChange={handleChange}
            placeholder="간략한 자기소개를 입력하세요"
          />
        </InputGroup>

        <SnsContainer>
          <Label>SNS 주소</Label>
          {profileData.sns.map((sns, index) => (
            <SnsRow key={index}>
              <Select
                value={sns.type}
                onChange={(e) => handleSnsChange(index, "type", e.target.value)}
                style={{ flex: 1 }}
              >
                {snsOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <Input
                type="url"
                value={sns.url}
                onChange={(e) => handleSnsChange(index, "url", e.target.value)}
                placeholder="URL 입력"
                style={{ flex: 2 }}
              />
              <RemoveSnsButton
                type="button"
                onClick={() => handleRemoveSns(index)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </RemoveSnsButton>
            </SnsRow>
          ))}
          <AddSnsButton type="button" onClick={handleAddSns}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4V20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 12H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            SNS 추가
          </AddSnsButton>
        </SnsContainer>

        <SaveButton type="submit">저장하기</SaveButton>
      </Form>
    </Container>
  );
};

export default ProfileEditSection;
