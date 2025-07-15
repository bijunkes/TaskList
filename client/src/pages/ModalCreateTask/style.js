import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  background-color: var(--fundo-parte2);
  padding: 3vh;
  border-radius: 20px;
  width: 40vh;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    color: var(--cor-texto);
    font-size: 20px;
  }

  button {
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: var(--cor-texto);
  }
`;

export const ModalBody = styled.div`
  margin-top: 2vh;
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;

export const Input = styled.input`
  padding: 2vh;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  padding: 2vh;
  border-radius: 10px;
  background-color: var(--fundo-campo);
  color: var(--cor-texto);
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: var(--fundo-parte1);
  }
`;
