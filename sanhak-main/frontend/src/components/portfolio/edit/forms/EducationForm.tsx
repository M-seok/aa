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

interface EducationFormProps {
  onSave: (education: Omit<EducationItem, 'id'>) => void;
  onCancel: () => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<EducationItem, 'id'>>({
    school: '',
    major: '',
    degree: '',
    startDate: '',
    endDate: '',
    isAttending: false,
    description: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid style={{ marginBottom: '30px' }}>
      <FormGroup>
      <FormLabel>학교명</FormLabel>
      <Input 
      type="text" 
      name="school"
      value={formData.school}
      onChange={handleChange}
      placeholder="학교명을 입력하세요" 
      required
      />
      </FormGroup>
      
      <FormGroup>
      <FormLabel>전공</FormLabel>
      <Input 
      type="text"
      name="major"
      value={formData.major}
      onChange={handleChange}
      placeholder="전공을 입력하세요" 
      required
      />
      </FormGroup>
      </FormGrid>
      
      <FormGrid style={{ marginBottom: '30px' }}>
      <FormGroup>
      <FormLabel>학위</FormLabel>
      <Select 
      name="degree"
      value={formData.degree}
        onChange={handleChange}
      required
      >
      <option value="">학위를 선택하세요</option>
      <option value="고등학교">고등학교</option>
      <option value="전문학사">전문학사</option>
      <option value="학사">학사</option>
        <option value="석사">석사</option>
          <option value="박사">박사</option>
        </Select>
      </FormGroup>
      </FormGrid>
      
      <FormGrid style={{ marginBottom: '30px' }}>
      <FormGroup>
      <FormLabel>입학일</FormLabel>
      <Input 
      type="date" 
        name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
      />
      </FormGroup>
      
      <FormGroup>
      <FormLabel>졸업일</FormLabel>
      <Input 
      type="date" 
      name="endDate"
        value={formData.endDate}
          onChange={handleChange}
          disabled={formData.isAttending}
          required={!formData.isAttending}
      />
      </FormGroup>
      </FormGrid>
      
      <FormGroup style={{ marginBottom: '30px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <input 
      type="checkbox"
      name="isAttending"
        checked={formData.isAttending}
          onChange={handleCheckboxChange}
            style={{ marginRight: '8px', width: 'auto' }}
          />
          현재 재학중
      </label>
      </FormGroup>
      
      <FormGroup style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
      <FormLabel>추가 설명</FormLabel>
      <TextArea 
        name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="학교 과정에 대한 추가 설명을 입력하세요"
        />
      </FormGroup>
      
      <FormActions>
        <CancelButton type="button" onClick={onCancel}>취소</CancelButton>
        <SaveButton type="submit">저장</SaveButton>
      </FormActions>
    </form>
  );
};

export default EducationForm;
