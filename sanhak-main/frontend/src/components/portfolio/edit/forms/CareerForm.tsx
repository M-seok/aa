import React, { useState } from 'react';
import styled from 'styled-components';
import { FormStyles } from './FormStyles';

const { 
  FormGrid, 
  FormGroup, 
  FormLabel, 
  Input, 
  TextArea, 
  FormActions, 
  CancelButton, 
  SaveButton 
} = FormStyles;

interface CareerItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isWorking: boolean;
  description: string;
}

interface CareerFormProps {
  onSave: (career: Omit<CareerItem, 'id'>) => void;
  onCancel: () => void;
}

const CareerForm: React.FC<CareerFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<CareerItem, 'id'>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    isWorking: false,
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          <FormLabel>회사명</FormLabel>
          <Input 
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="회사명을 입력하세요"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>직책</FormLabel>
          <Input 
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="직책을 입력하세요"
            required
          />
        </FormGroup>
      </FormGrid>
      
      <FormGrid style={{ marginBottom: '30px' }}>
        <FormGroup>
          <FormLabel>입사일</FormLabel>
          <Input 
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>퇴사일</FormLabel>
          <Input 
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            disabled={formData.isWorking}
            required={!formData.isWorking}
          />
        </FormGroup>
      </FormGrid>
      
      <FormGroup style={{ marginBottom: '30px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input 
            type="checkbox"
            name="isWorking"
            checked={formData.isWorking}
            onChange={handleCheckboxChange}
            style={{ marginRight: '8px', width: 'auto' }}
          />
          현재 재직중
        </label>
      </FormGroup>
      
      <FormGroup style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
        <FormLabel>업무 설명</FormLabel>
        <TextArea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="회사에서의 역할과 업무에 대한 설명을 입력하세요"
        />
      </FormGroup>
      
      <FormActions>
        <CancelButton type="button" onClick={onCancel}>취소</CancelButton>
        <SaveButton type="submit">저장</SaveButton>
      </FormActions>
    </form>
  );
};

export default CareerForm;
