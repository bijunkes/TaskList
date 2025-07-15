import styled from 'styled-components';

export const Container = styled.div`
  background-color: var(--fundo-parte1);
  height: 100vh;
  color: var(--cor-texto);
  display: flex; 
  justify-content: center;
  align-items: center;
`;

export const List = styled.div`
    background-color: var(--fundo-parte2);
    width: 85vh;
    height: 85vh;
    border-radius: 40px;
    display: flex;
    flex-direction: column;
`

export const Header = styled.div`
    flex: 1;
    background-color: var(--fundo-campo);
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LogoHeader = styled.p`
    font-size: 22px;
    font-weight: 0.5;
`;

export const Body = styled.div`
    flex: 9;
    padding: 4vh 5vh 4vh 5vh;
`

export const Campo = styled.div`
    display: flex;
    gap: 2vh;
    margin-bottom: 4vh;
`;

export const Pesquisa = styled.input`
    height: 6vh;
    width: calc(100% - 8vh);
    background-color: var(--fundo-campo);
    border-radius: 40px;
    display: flex;
    align-items: center;
    padding-left: 5vh;
    cursor: pointer;
`;

export const CriarTasks = styled.button`
    height: 6vh;
    width: 6vh;
    background-color: var(--fundo-campo);
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    cursor: pointer;
`;

export const Divisoria = styled.div`
    height: 3px;
    width: 100%;
    background-color: var(--fundo-campo);
`;

export const CampoTask = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 2vh;
    padding: 2vh;
`;

export const Checkbox = styled.input`
  margin-top: 1vh;
`;

export const TituloTask = styled.p`
`

export const Descricao = styled.p`
  font-size: 14px;
  opacity: 0.6;
`;
