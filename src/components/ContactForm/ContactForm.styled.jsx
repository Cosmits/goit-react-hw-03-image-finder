import styled from '@emotion/styled';

export const Form = styled.form`
margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 300px;

  & button:hover {
    background-color: greenyellow;
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;

  /* & input {
    font-size: 14px;
    padding: 10px;
  } */
`;

export const InputForm = styled.input`
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
`;

export const input = styled.input`
  background-color: aqua;
`;

export const Button = styled.button`
  cursor: pointer;
  background-color: white;
  border-radius: 5px;
  border: 2px solid lightgray;
  padding: 10px;
  transition: background-color 250ms linear;
`;
