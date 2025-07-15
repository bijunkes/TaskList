import React from "react";
import {
    CampoTask,
    Checkbox,
    InfoContainer,
    TituloTask,
    Descricao,
    Prazo
} from "./style";

function Task({ task, onEdit }) {
    if (!task) return null;

    const dataISO = task.prazo.split("T")[0];
    const [ano, mes, dia] = dataISO.split("-");
    const dataFormatada = `${dia}/${mes}/${ano}`;


    return (
        <CampoTask>
            <Checkbox />
            <InfoContainer>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TituloTask onClick={onEdit} style={{ cursor: 'pointer' }}>{task.titulo}</TituloTask>
                    <Prazo>{dataFormatada}</Prazo>
                </div>
                <Descricao>{task.descricao}</Descricao>
            </InfoContainer>
        </CampoTask>
    )
}

export default Task