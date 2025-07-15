import React, { useEffect, useState } from "react"
import api from "../../services/api";
import {
    ModalContainer,
    Overlay,
    ModalHeader,
    ModalBody,
    Input,
    Button,
    ButtonContainer,
    DeleteButton
} from "./style";

function ModalAtualizarTask({ task, onClose, onSubmit, onDelete }) {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [prazo, setPrazo] = useState("");

    useEffect(() => {
        if (task) {
            setTitulo(task.titulo || "");
            setDescricao(task.descricao || "");
            setPrazo(task.prazo || "");
        }
    }, [task]);


    async function handleUpdate(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            const response = await api.put(`/tasks/${task.id}`, {
                titulo,
                descricao,
                prazo
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            onSubmit({
                id: task.id,
                titulo,
                descricao,
                prazo
            });

            onClose();
        } catch (error) {
            alert('Erro ao atualizar task');
        }
    }

    return (
        <Overlay>
            <ModalContainer>
                <ModalHeader>
                    <h2>Atualizar Task</h2>
                    <button onClick={onClose}>X</button>
                </ModalHeader>
                <ModalBody as="form" onSubmit={handleUpdate}>
                    <Input
                        type="text"
                        placeholder="Título"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <Input
                        type="date"
                        value={prazo}
                        onChange={e => setPrazo(e.target.value)}
                    />
                    <ButtonContainer>
                        <DeleteButton
                            type="button"
                            onClick={() => {
                                if (confirm('Tem certeza que deseja excluir esta task?')) {
                                    onDelete(task.id)
                                }
                            }}
                        >
                            Excluir
                        </DeleteButton>
                        <Button type="submit">Salvar</Button>
                    </ButtonContainer>
                </ModalBody>
            </ModalContainer>
        </Overlay>
    )
}

export default ModalAtualizarTask