import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import api from "../../services/api";
import {
    Container,
    Parte1,
    Logo,
    LeftAlign,
    Negrito,
    Opaco,
    ButtonEntrar,
    Parte2,
    Form,
    Negrito2,
    Opaco2,
    Input,
    ButtonCadastrar,
} from './style.js'

function Register() {
    const navigate = useNavigate()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        if (!nome.trim() || !email.trim() || !senha.trim()) {
            alert('Preencha todos os campos')
            return;
        }
        try {
            const response = await api.post('/auth/register', { nome, email, senha })
            localStorage.setItem('token', response.data.token)
            setError('')
            setNome('')
            setEmail('')
            setSenha('')
            alert('Cadastro efetuado')
        } catch {
            setError('Dados invalidos')
        }
    }

    function handleEntrar() {
        navigate('/login')
    }

    return (
        <Container>
            <Parte1>
                <Logo>TASKLIST</Logo>
                <LeftAlign>
                    <Negrito>Bem-vindo <br />de volta!</Negrito>
                    <Opaco>Acesse sua conta agora mesmo.</Opaco>
                </LeftAlign>
                <ButtonEntrar onClick={handleEntrar}>ENTRAR</ButtonEntrar>
            </Parte1>
            <Parte2>

                <Form onSubmit={handleSubmit}>
                    <Negrito2>Crie uma conta</Negrito2>
                    <Opaco2>Preencha seus dados.</Opaco2>
                    <Input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <ButtonCadastrar type="submit">CADASTRAR</ButtonCadastrar>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </Form>
            </Parte2>
        </Container>

    )
}

export default Register