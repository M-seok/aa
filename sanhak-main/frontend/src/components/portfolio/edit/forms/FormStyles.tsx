import styled from 'styled-components';

export const FormStyles = {
  FormGrid: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 50px;
    margin-bottom: 25px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  `,

  FormGroup: styled.div`
    margin-bottom: 15px;
  `,

  FormLabel: styled.label`
    display: block;
    margin-bottom: 8px;
    margin-top: 3px;
    font-weight: 500;
    color: #4a5568;
    font-size: 1rem;
  `,

  Input: styled.input`
    width: 100%;
    padding: 10px 14px;
    border: 2px solid #CBD5E0;
    border-radius: 5px;
    font-size: 0.95rem;
    transition: all 0.2s;
    background-color: #FAFAFA;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    
    &:focus {
      outline: none;
      border-color: #3182ce;
      background-color: #FFFFFF;
      box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2);
    }
    
    &:hover {
      border-color: #A0AEC0;
    }
  `,

  TextArea: styled.textarea`
    width: 100%;
    padding: 10px 14px;
    border: 2px solid #CBD5E0;
    border-radius: 5px;
    font-size: 0.95rem;
    min-height: 80px;
    resize: vertical;
    transition: all 0.2s;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    background-color: #FAFAFA;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    
    &:focus {
      outline: none;
      border-color: #3182ce;
      background-color: #FFFFFF;
      box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2);
    }
    
    &:hover {
      border-color: #A0AEC0;
    }
  `,

  Select: styled.select`
    width: 100%;
    padding: 10px 14px;
    border: 2px solid #CBD5E0;
    border-radius: 5px;
    font-size: 0.95rem;
    transition: all 0.2s;
    background-color: #FAFAFA;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    
    &:focus {
      outline: none;
      border-color: #3182ce;
      background-color: #FFFFFF;
      box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2);
    }
    
    &:hover {
      border-color: #A0AEC0;
    }
  `,

  FormActions: styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 15px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  `,

  CancelButton: styled.button`
    padding: 10px 15px;
    background-color: #e2e8f0;
    color: #4a5568;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #cbd5e0;
    }
  `,

  SaveButton: styled.button`
    padding: 10px 20px;
    background-color: #3182ce;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #2c5282;
    }
  `,

  ItemCard: styled.div`
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    position: relative;
  `,

  ItemHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  `,

  ItemTitle: styled.h3`
    font-size: 1.2rem;
    color: #2d3748;
    margin: 0;
  `,

  ItemInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,

  ItemDetail: styled.p`
    margin: 0;
    color: #4a5568;
    font-size: 0.95rem;
  `,

  ItemDetailLabel: styled.span`
    font-weight: 500;
    color: #718096;
    display: inline-block;
    min-width: 80px;
  `,

  DeleteButton: styled.button`
    background: none;
    border: none;
    color: #e53e3e;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #fff5f5;
    }
    
    svg {
      font-size: 1.2rem;
    }
  `
};
