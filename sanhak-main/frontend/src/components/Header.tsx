import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import KakaoLogin from "react-kakao-login";
import { useNavigate, useLocation } from "react-router-dom";

// 스타일 컴포넌트들
const HeaderContainer = styled.header`
  height: 140px;
  background-color: #3182ce;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 70px;
  position: relative;
  z-index: 10;
`;

const BackButton = styled.button`
  position: absolute;
  top: 50%;
  left: 70px;
  transform: translateY(-50%);
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #3182ce;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
`;

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.02);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

const RightContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
`;

const UserName = styled.div`
  color: white;
  font-size: 16px;
`;

const Button = styled.button<{ isKakao?: boolean }>`
  background-color: ${(props) => (props.isKakao ? "#fee500" : "white")};
  color: ${(props) => (props.isKakao ? "#000000" : "#333333")};
  border: none;
  border-radius: 5px;
  height: 40px;
  padding: 0 15px;
  cursor: pointer;
  font-weight: ${(props) => (props.isKakao ? "bold" : "normal")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.isKakao ? "8px" : "0")};

  &:hover {
    background-color: ${(props) => (props.isKakao ? "#ffde00" : "#f5f5f5")};
  }
`;

// 카카오 로고 컴포넌트
const KakaoLogo = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 0.5C4.02944 0.5 0 3.69924 0 7.68568C0 10.1948 1.55893 12.4069 3.93304 13.71C3.7125 14.2793 3.26339 15.5475 3.1425 16.0186C3.00089 16.6134 3.35304 16.614 3.64768 16.4234C3.89464 16.2673 5.47411 15.1888 6.33482 14.5856C7.19554 14.6871 8.0866 14.8712 9 14.8712C13.9706 14.8712 18 11.6721 18 7.68568C18 3.69924 13.9706 0.5 9 0.5Z"
      fill="#000000"
    />
  </svg>
);

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 현재 페이지가 메인 페이지가 아닐 때만 뒤로가기 버튼 표시
  const showBackButton = location.pathname !== "/";
  // 뒤로가기 버튼 클릭 핸들러
  const handleBackClick = () => {
    navigate('/');
  };

  // 타이틀 클릭 시 메인 페이지로 이동
  const handleTitleClick = () => {
    navigate("/");
  };
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  // 카카오 JavaScript SDK 키
  const KAKAO_JS_KEY = "bb160f901f05e41f7d00545da89d8b06";

  // 사용자 정보 요청 함수 (중복 제거)
  const fetchUserInfo = useCallback(() => {
    if (!window.Kakao?.API) return;

    window.Kakao.API.request({
      url: "/v2/user/me",
      success: (res: any) => {
        console.log("사용자 정보:", res);

        // 닉네임 설정 (여러 경로에서 찾기)
        const nickname =
          res.properties?.nickname ||
          res.kakao_account?.profile?.nickname ||
          "카카오 사용자";

        // 프로필 이미지 설정
        const profileImg =
          res.properties?.profile_image ||
          res.kakao_account?.profile?.profile_image_url ||
          "";

        setUserName(nickname);
        setProfileImage(profileImg);
        setIsLogin(true);
      },
      fail: (error: any) => {
        console.error("사용자 정보 요청 실패:", error);
        setUserName("카카오 사용자");
        setIsLogin(true);
      },
    });
  }, []);

  // 카카오 로그인 성공 시 처리
  const handleKakaoSuccess = (data: any) => {
    console.log("카카오 로그인 성공");

    try {
      // 액세스 토큰 설정
      if (data.response?.access_token) {
        window.Kakao.Auth.setAccessToken(data.response.access_token);
        // 사용자 정보 요청
        fetchUserInfo();
      }
    } catch (error) {
      console.error("로그인 처리 중 오류:", error);
      setUserName("카카오 사용자");
      setIsLogin(true);
    }
  };

  // 카카오 로그인 실패 시 처리
  const handleKakaoFail = (error: any) => {
    console.error("카카오 로그인 실패:", error);
  };

  // 로그아웃 처리
  const handleLogout = () => {
    try {
      if (window.Kakao?.Auth?.getAccessToken()) {
        window.Kakao.Auth.logout(() => {
          console.log("카카오 로그아웃 완료");
          resetUserState();
        });
      } else {
        resetUserState();
      }
    } catch (error) {
      console.error("로그아웃 처리 중 오류:", error);
      resetUserState();
    }
  };

  // 사용자 상태 초기화 (중복 제거)
  const resetUserState = () => {
    setIsLogin(false);
    setUserName("");
    setProfileImage("");
  };

  // 카카오 SDK 초기화 및 로그인 상태 확인
  useEffect(() => {
    let isComponentMounted = true;

    // SDK 초기화
    try {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
        console.log("카카오 SDK 초기화 완료");
      }

      // 이미 로그인되어 있는지 확인
      if (window.Kakao?.Auth?.getAccessToken() && isComponentMounted) {
        setIsLogin(true);
        fetchUserInfo();
      }
    } catch (error) {
      console.error("SDK 초기화 중 오류:", error);
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      isComponentMounted = false;
    };
  }, [fetchUserInfo]);

  return (
    <HeaderContainer>
      {showBackButton && (
        <BackButton onClick={handleBackClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="#3182ce" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 19L5 12L12 5" stroke="#3182ce" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </BackButton>
      )}
      <TitleContainer>
        <Title onClick={handleTitleClick}>포트폴리오 관리</Title>
      </TitleContainer>
      <RightContainer>
        {isLogin ? (
          <>
            <ProfileContainer>
              {profileImage && (
                <ProfileImage src={profileImage} alt="프로필 이미지" />
              )}
              <UserName>{userName}</UserName>
            </ProfileContainer>
            <Button onClick={handleLogout}>로그아웃</Button>
          </>
        ) : (
          <KakaoLogin
            token={KAKAO_JS_KEY}
            onSuccess={handleKakaoSuccess}
            onFail={handleKakaoFail}
            render={({ onClick }) => (
              <Button isKakao onClick={onClick}>
                <KakaoLogo />
                카카오로 로그인
              </Button>
            )}
          />
        )}
      </RightContainer>
    </HeaderContainer>
  );
};

export default Header;
