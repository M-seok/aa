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

interface AwardItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
}

interface AwardFormProps {
  onSave: (award: Omit<AwardItem, 'id'>) => void;
  onCancel: () => void;
}

const AlignedFormGroup = styled(FormGroup)`
  text-align: left;
`;

const AwardForm: React.FC<AwardFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<AwardItem, 'id'>>({
    name: '',
    issuer: '',
    date: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
          <FormLabel>수상명</FormLabel>
          <Input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="수상명을 입력하세요"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>수여 기관</FormLabel>
          <Input 
            type="text"
            name="issuer"
            value={formData.issuer}
            onChange={handleChange}
            placeholder="수여 기관을 입력하세요"
            required
          />
        </FormGroup>
      </FormGrid>
      
      <AlignedFormGroup style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '30px' }}>
        <FormLabel>수상일</FormLabel>
        <Input 
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={{ maxWidth: '300px' }}
        />
      </AlignedFormGroup>
      
      <AlignedFormGroup style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
        <FormLabel>수상 내용</FormLabel>
        <TextArea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="수상 내용에 대한 설명을 입력하세요"
        />
      </AlignedFormGroup>
      
      <FormActions>
        <CancelButton type="button" onClick={onCancel}>취소</CancelButton>
        <SaveButton type="submit">저장</SaveButton>
      </FormActions>
    </form>
  );
};

export default AwardForm;
