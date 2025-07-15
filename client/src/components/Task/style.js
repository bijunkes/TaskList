import styled from 'styled-components'

export const CampoTask = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  -webkit-appearance: none;
  width: 2vh;
  height: 2vh;
  border: 2px solid #ffffff;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  margin-right: 12px;
  background-color: transparent;

  &:checked {
    background-color: #ffffff;
  }

  &:checked::after {
    content: '✔';
    position: absolute;
    top: -2px;
    left: 3px;
    font-size: 1.6vh;
    color: var(--fundo-parte2);
    font-weight: bold;
  }
`;

export const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const TituloTask = styled.p`
    font-size: 18px;
    margin-bottom: 1vh;
`

export const Descricao = styled.p`
  font-size: 14px;
  opacity: 0.6;
`;

export const Prazo = styled.p`
  font-size: 16px;
`;