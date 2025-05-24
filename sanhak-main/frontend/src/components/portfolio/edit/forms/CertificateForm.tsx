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

interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

interface CertificateFormProps {
  onSave: (certificate: Omit<CertificateItem, 'id'>) => void;
  onCancel: () => void;
}

const CertificateForm: React.FC<CertificateFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<CertificateItem, 'id'>>({
    name: '',
    issuer: '',
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
          <FormLabel>자격증명</FormLabel>
          <Input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="자격증명을 입력하세요"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel>발급 기관</FormLabel>
          <Input 
            type="text"
            name="issuer"
            value={formData.issuer}
            onChange={handleChange}
            placeholder="발급 기관을 입력하세요"
            required
          />
        </FormGroup>
      </FormGrid>
      
      <FormGroup style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
        <FormLabel>취득일</FormLabel>
        <Input 
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={{ maxWidth: '300px' }}
        />
      </FormGroup>
      
      <FormActions>
        <CancelButton type="button" onClick={onCancel}>취소</CancelButton>
        <SaveButton type="submit">저장</SaveButton>
      </FormActions>
    </form>
  );
};

export default CertificateForm;
