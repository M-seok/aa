import React, { useState } from "react";
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

const TextAreaGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #4a5568;
`;

const TextArea = styled.textarea`
  padding: 15px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  font-size: 1rem;
  color: #2d3748;
  resize: vertical;
  min-height: 150px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
  }
  
  &.limit-warning {
    border-color: #e53e3e;
  }
`;

const CharacterCount = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.875rem;
  margin-top: 5px;
  
  &.limit-warning {
    color: #e53e3e;
    font-weight: 600;
  }
`;

const SaveButton = styled.button`
  padding: 12px 16px;
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
`;

// 인터페이스
interface AboutEditSectionProps {
  // 여기에 필요한 props 정의
}

const MAX_CHAR_LIMIT = 500;

const AboutEditSection: React.FC<AboutEditSectionProps> = () => {
  const [growth, setGrowth] = useState('');
  const [personality, setPersonality] = useState('');
  const [experience, setExperience] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHAR_LIMIT) {
      setter(value);
    }
  };
  
  const getCharacterCountClass = (text: string) => {
    return text.length > MAX_CHAR_LIMIT * 0.9 ? 'limit-warning' : '';
  };
  return (
    <Container>
      <Title>자기소개</Title>
      
      <TextAreaGroup>
        <Label htmlFor="growth">성장 과정</Label>
        <TextArea
          id="growth"
          name="growth"
          placeholder="자신의 성장 과정에 대해 서술해주세요."
          value={growth}
          onChange={(e) => handleChange(e, setGrowth)}
          className={getCharacterCountClass(growth)}
          maxLength={MAX_CHAR_LIMIT}
        />
        <CharacterCount className={getCharacterCountClass(growth)}>
          {growth.length}/{MAX_CHAR_LIMIT}자
        </CharacterCount>
      </TextAreaGroup>
      
      <TextAreaGroup>
        <Label htmlFor="personality">성격 및 장단점</Label>
        <TextArea
          id="personality"
          name="personality"
          placeholder="자신의 성격과 장단점에 대해 서술해주세요."
          value={personality}
          onChange={(e) => handleChange(e, setPersonality)}
          className={getCharacterCountClass(personality)}
          maxLength={MAX_CHAR_LIMIT}
        />
        <CharacterCount className={getCharacterCountClass(personality)}>
          {personality.length}/{MAX_CHAR_LIMIT}자
        </CharacterCount>
      </TextAreaGroup>
      
      <TextAreaGroup>
        <Label htmlFor="experience">주요 경험</Label>
        <TextArea
          id="experience"
          name="experience"
          placeholder="자신의 주요 경험에 대해 서술해주세요."
          value={experience}
          onChange={(e) => handleChange(e, setExperience)}
          className={getCharacterCountClass(experience)}
          maxLength={MAX_CHAR_LIMIT}
        />
        <CharacterCount className={getCharacterCountClass(experience)}>
          {experience.length}/{MAX_CHAR_LIMIT}자
        </CharacterCount>
      </TextAreaGroup>
    </Container>
  );
};

export default AboutEditSection;
