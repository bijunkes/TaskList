import conectarDB from "../database/db.js";
import bcrypt from 'bcryptjs';
import { gerarToken } from "../auth.js";

export async function registrarUsuario(req, res) {
    const { nome, email, senha } = req.body;
    const db = await conectarDB();

    try {
        const senhaHash = await bcrypt.hash(senha, 10)

        const resultado = await db.run(
            `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
            [nome, email, senhaHash]
        )
        const userId = resultado.lastID
        const token = gerarToken({id: userId, nome})
        res.status(201).json({message: 'Usuario cadastrado', token})
    } catch (error) {
        res.status(400).json({error: 'Erro cadastro'})
    }
}

export async function logarUsuario(req, res) {
    const {email, senha} = req.body
    const db = await conectarDB()

    try {
        const user = await db.get(`SELECT * FROM usuarios WHERE email = (?)`, [email])

        if(!user) {
            return res.status(404).json({error: 'Usuario nao encontrado'})
        }

        const senhaValida = await bcrypt.compare(senha, user.senha)
        if(!senhaValida) {
            return res.status(401).json({error: 'Senha incorreta'})
        }

        const token = gerarToken({id: user.id, nome: user.nome})

        res.json({message: 'Login sucedido', token})
    } catch (error) {
        res.status(500).json({error: 'Erro ao efetuar logon'})
    }
}

export async function excluirUsuario(req,  res) {
    const {id} = req.params
    const db = await conectarDB()

    try {
        await db.run(`
            DELETE FROM usuarios WHERE id = (?)`, [id]
        )
        res.status(200).json({message: 'Usuario excluido'})
    } catch (error) {
        res.status(500).json({error: 'Erro ao excluir usuario'})
    }
}

export async function atualizarUsuario(req, res) {
    const {id} = req.params
    const {nome, email, senha} = req.body
    const db = await conectarDB()

    try {
        const user = await db.get(`SELECT * FROM usuarios WHERE id = ?`, [id])
        if (!user) {
            return res.status(404).json({error: 'Usuario nao encontrado'})
        }

        const novoNome = (nome !== undefined  && nome.trim() !== '') ? nome : user.nome;
        const novoEmail = (email !== undefined && email.trim() !== '') ? email : user.email;
        let senhaHash = user.senha

        if (senha && senha !== "") {
            senhaHash = await bcrypt.hash(senha, 10)
        }

        await db.run(
            `UPDATE usuarios
            SET nome = ?, email = ?, senha = ?
            WHERE id = ?`,
            [novoNome, novoEmail, senhaHash, id])
        
        res.status(200).json({message: 'Usuario atualizado'})
    } catch (error) {
        res.status(500).json({error: 'Error ao atualizar usuario'})
    }
}