import React, { useState } from 'react';
import { FormStyles } from './FormStyles';

const { 
  FormGrid, 
  FormGroup, 
  FormLabel, 
  Input, 
  FormActions, 
  CancelButton, 
  SaveButton 
} = FormStyles;

interface LanguageItem {
  id: string;
  language: string;
  testName: string;
  score: string;
  date: string;
}

interface LanguageFormProps {
  onSave: (language: Omit<LanguageItem, 'id'>) => void;
  onCancel: () => void;
}

const LanguageForm: React.FC<LanguageFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<LanguageItem, 'id'>>({
    language: '',
    testName: '',
    score: '',
    date: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <FormGrid>
        <FormGroup>
          <FormLabel>언어</FormLabel>
          <Input 
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="언어를 입력하세요 (예: 영어, 일본어)"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>시험명</FormLabel>
          <Input 
            type="text"
            name="testName"
            value={formData.testName}
            onChange={handleChange}
            placeholder="시험명을 입력하세요 (예: TOEIC, JLPT)"
            required
          />
        </FormGroup>
        
        <FormGroup style={{ marginTop: '-20px' }}>
          <FormLabel>점수/급수</FormLabel>
          <Input 
            type="text"
            name="score"
            value={formData.score}
            onChange={handleChange}
            placeholder="점수나 급수를 입력하세요 (예: 900, N1)"
            required
          />
        </FormGroup>
        
        <FormGroup style={{ marginTop: '-20px' }}>
          <FormLabel>취득일</FormLabel>
          <Input 
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </FormGroup>
      </FormGrid>
      
      <FormActions>
        <CancelButton type="button" onClick={onCancel}>취소</CancelButton>
        <SaveButton type="submit">저장</SaveButton>
      </FormActions>
    </form>
  );
};

export default LanguageForm;
