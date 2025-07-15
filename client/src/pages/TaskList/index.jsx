import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import api from "../../services/api";
import {
    Container,
    List,
    Header,
    LogoHeader,
    Body,
    Campo,
    Pesquisa,
    CriarTasks,
    Divisoria,
    CampoTask,
    Checkbox,
    TituloTask,
    Descricao,
} from "./style";
import Task from "../../components/Task";
import ModalCreateTask from "../ModalCreateTask"
import ModalAtualizarTask from "../ModalAtualizarTask";

function TaskList() {
    const navigate = useNavigate()

    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [taskEditando, setTaskEditando] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [busca, setBusca] = useState("");

    const tasksFiltradas = tasks.filter(task => 
        task.titulo.toLowerCase().includes(busca.toLowerCase()) || task.descruicao?.toLowerCase().includes(busca.toLowerCase())
    )

    function handleCreateTask(novaTask) {
        setTasks(prevTasks => [...prevTasks, novaTask]);
    }

    function handleEditarTask(task) {
        setTaskEditando(task);
        setShowEditModal(true);
    }

    function handleUpdateTask(taskAtualizada) {
        setTasks(prev =>
            prev.map(t => (t.id === taskAtualizada.id ? taskAtualizada : t))
        );
        setShowEditModal(false);
        setTaskEditando(null);
    }

    async function handleDeleteTask(id) {
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks(prev => prev.filter(task => task.id !== id));
            setShowEditModal(false);
            setTaskEditando(null);
        } catch (error) {
            alert('Erro ao excluir task');
        }
    }

    useEffect(() => {
        async function fetchTasks() {
            try {
                const token = localStorage.getItem('token')
                const response = await api.get('/tasks', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setTasks(response.data)
            } catch (error) {
                navigate('/login')
            }
        }
        fetchTasks()
    }, [navigate])

    return (
        <Container>
            <List>
                <Header>
                    <LogoHeader>
                        TASKLIST
                    </LogoHeader>
                </Header>
                <Body>
                    <Campo>
                        <Pesquisa
                            type="text"
                            placeholder="Pesquisar"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)} />

                        <CriarTasks onClick={() => setShowModal(true)}>
                            +
                        </CriarTasks>

                        {showModal && (
                            <ModalCreateTask
                                onClose={() => setShowModal(false)}
                                onSubmit={handleCreateTask}
                            />
                        )}

                        {showEditModal && taskEditando && (
                            <ModalAtualizarTask
                                task={taskEditando}
                                onClose={() => setShowEditModal(false)}
                                onSubmit={handleUpdateTask}
                                onDelete={handleDeleteTask}
                            />
                        )}

                    </Campo>
                    <Divisoria />
                    <ul>
                        {tasksFiltradas.map(task => (
                            <React.Fragment key={task.id}>
                                <Task task={task} onEdit={() => handleEditarTask(task)} />
                                <Divisoria />
                            </React.Fragment>
                        ))}
                    </ul>
                </Body>
            </List>
        </Container>
    )
}

export default TaskList