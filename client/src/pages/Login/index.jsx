import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
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

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        if (!email.trim() || !senha.trim()) {
            alert('Preencha todos os campos');
            return;
        }

        try {
            const response = await api.post('/auth/login', {email, senha})
            localStorage.setItem('token', response.data.token)
            setError('')
            setEmail('')
            setSenha('')
            navigate('/tasks')
        } catch {
            alert('Email ou senha invalidos')
        }
    }

    function handleVoltar(){
        navigate('/register')
    }

    return (
            <Container>
                <Parte1>
                    <Logo>TASKLIST</Logo>
                    <LeftAlign>
                        <Negrito>Bem-vindo <br />de volta!</Negrito>
                        <Opaco>Acesse sua conta agora mesmo.</Opaco>
                    </LeftAlign>
                    <ButtonEntrar onClick={handleVoltar}>VOLTAR</ButtonEntrar>
                </Parte1>
                <Parte2>
    
                    <Form onSubmit={handleSubmit}>
                        <Negrito2>Acesse sua conta</Negrito2>
                        <Opaco2>Preencha seus dados.</Opaco2>
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
                        <ButtonCadastrar type="submit">ENTRAR</ButtonCadastrar>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </Form>
                </Parte2>
            </Container>
    
        )
}

export default Login