import React, { useEffect, useState } from "react"
import api from "../../services/api";
import {
    ModalContainer,
    Overlay,
    ModalHeader,
    ModalBody,
    Input,
    Button
} from "./style";

function ModalCreateTask({ onClose, onSubmit }) {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [prazo, setPrazo] = useState("");

    async function handleSubmit(e) {
        e.preventDefault()

        const novaTask = {titulo, descricao, prazo}

        try{
            const token = localStorage.getItem('token')
            const response = await api.post('/tasks', novaTask, {
                headers: {Authorization: `Baerer ${token}`}
            })

            onSubmit(response.data)

            onClose()
        } catch (error){
            alert('Erro ao criar task')
            console.log(error)
        }

    }

    return (
        <Overlay>
            <ModalContainer>
                <ModalHeader>
                    <h2>Nova Task</h2>
                    <button onClick={onClose}>X</button>
                </ModalHeader>
                <ModalBody as="form" onSubmit={handleSubmit}>
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
                    <Button type="submit">Criar</Button>
                </ModalBody>
            </ModalContainer>
        </Overlay>
    )
}

export default ModalCreateTask