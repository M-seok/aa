import React, { useState } from 'react';
import styled from 'styled-components';
import { FormStyles } from './FormStyles';

const { 
  FormGrid, 
  FormGroup, 
  FormLabel, 
  Input, 
  TextArea,
  Select,
  FormActions, 
  CancelButton, 
  SaveButton 
} = FormStyles;

const AlignedFormGroup = styled(FormGroup)`
  text-align: left;
`;

const TagsInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  min-height: 40px;
  padding: 4px 8px;
  border: 2px solid #CBD5E0;
  border-radius: 5px;
  background-color: #FAFAFA;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  
  &:focus-within {
    border-color: #3182ce;
    background-color: #FFFFFF;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2);
  }
  
  &:hover {
    border-color: #A0AEC0;
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  background-color: #ebf4ff;
  border: 1px solid #bee3f8;
  color: #3182ce;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  gap: 4px;
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: #4a5568;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2px;
  
  &:hover {
    color: #e53e3e;
  }
`;

const TagInput = styled(Input)`
  flex: 1;
  min-width: 100px;
  border: none;
  padding: 4px;
  background-color: transparent;
  box-shadow: none;
  
  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: none;
  }
  
  &:hover {
    border-color: transparent;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

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

interface ProjectFormProps {
  onSave: (project: Omit<ProjectItem, 'id'>) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<ProjectItem, 'id'>>({
    title: '',
    period: '',
    startDate: '',
    endDate: '',
    isOngoing: false,
    role: '',
    projectScope: '개인',
    skills: [],
    description: '',
    serviceUrl: '',
    githubUrl: '',
    image: ''
  });
  
  const [skillInput, setSkillInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(skillInput.trim())) {
        setFormData({
          ...formData,
          skills: [...formData.skills, skillInput.trim()]
        });
      }
      setSkillInput('');
    }
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // 컴포넌트가 마운트될 때 날짜 초기화
  React.useEffect(() => {
    // 현재 날짜 설정
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const currentDate = `${year}-${month}`;
    
    // 6개월 전 날짜 계산
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const pastYear = sixMonthsAgo.getFullYear();
    const pastMonth = String(sixMonthsAgo.getMonth() + 1).padStart(2, '0');
    const pastDate = `${pastYear}-${pastMonth}`;
    
    setFormData(prev => ({
      ...prev,
      startDate: pastDate,
      endDate: currentDate
    }));
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid style={{ marginBottom: '30px' }}>
        <FormGroup>
          <FormLabel>프로젝트명</FormLabel>
          <Input 
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="프로젝트명을 입력하세요"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>역할</FormLabel>
          <Input 
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="프로젝트에서의 역할을 입력하세요"
            required
          />
        </FormGroup>
      </FormGrid>
      
      <FormGrid style={{ marginBottom: '30px' }}>
        <FormGroup>
          <FormLabel>시작일</FormLabel>
          <Input 
            type="month"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>종료일</FormLabel>
          <Input 
            type="month"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            disabled={formData.isOngoing}
            required={!formData.isOngoing}
          />
        </FormGroup>
      </FormGrid>
      
      <AlignedFormGroup style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '30px' }}>
        <CheckboxGroup>
          <input 
            type="checkbox"
            name="isOngoing"
            checked={formData.isOngoing}
            onChange={handleCheckboxChange}
            style={{ marginRight: '8px', width: 'auto' }}
          />
          <label>현재 진행중인 프로젝트</label>
        </CheckboxGroup>
      </AlignedFormGroup>
      
      <FormGrid style={{ marginBottom: '30px' }}>
        <FormGroup>
          <FormLabel>프로젝트 범위</FormLabel>
          <Select
            name="projectScope"
            value={formData.projectScope}
            onChange={handleChange}
            required
          >
            <option value="개인">개인 프로젝트</option>
            <option value="팀">팀 프로젝트</option>
            <option value="기업">기업 프로젝트</option>
            <option value="학교">학교 프로젝트</option>
            <option value="기타">기타</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <FormLabel>기술 스택</FormLabel>
          <TagsInput>
            {formData.skills.map((skill, index) => (
              <Tag key={index}>
                {skill}
                <RemoveTagButton onClick={() => handleRemoveSkill(skill)}>×</RemoveTagButton>
              </Tag>
            ))}
            <TagInput 
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="기술 입력 후 Enter (예: React, TypeScript)"
            />
          </TagsInput>
        </FormGroup>
      </FormGrid>
      
      <FormGrid style={{ marginBottom: '30px' }}>
        <FormGroup>
          <FormLabel>서비스 URL</FormLabel>
          <Input 
            type="url"
            name="serviceUrl"
            value={formData.serviceUrl}
            onChange={handleChange}
            placeholder="서비스 URL을 입력하세요 (선택사항)"
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>GitHub URL</FormLabel>
          <Input 
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            placeholder="GitHub URL을 입력하세요 (선택사항)"
          />
        </FormGroup>
      </FormGrid>
      
      <AlignedFormGroup style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '30px' }}>
        <FormLabel>프로젝트 설명</FormLabel>
        <TextArea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="프로젝트에 대한 설명을 입력하세요 (기능, 역할, 성과 등)"
          required
          style={{ minHeight: '150px' }}
        />
      </AlignedFormGroup>
      
      <FormActions>
        <CancelButton type="button" onClick={onCancel}>취소</CancelButton>
        <SaveButton type="submit">저장</SaveButton>
      </FormActions>
    </form>
  );
};

export default ProjectForm;
