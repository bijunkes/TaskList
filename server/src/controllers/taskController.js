import conectarDB from "../database/db.js";
import { verificarToken } from "../auth.js";

export async function registrarTask(req, res) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ error: 'Token nao fornecido' })
    }

    const token = authHeader.split(' ')[1]
    const usuario = verificarToken(token)

    if (!usuario) {
        return res.status(401).json({ error: 'Token invalido' })
    }

    const { titulo, descricao, prazo } = req.body
    const usuario_id = usuario.id

    const db = await conectarDB()

    try {
        const resultado = await db.run(
            `INSERT INTO tasks (titulo, descricao, prazo, usuario_id) VALUES (?, ?, ?, ?)`,
            [titulo, descricao, prazo, usuario_id]
        )

        const novaTask = await db.get(`SELECT * FROM tasks WHERE id = ?`, [resultado.lastID])

        res.status(201).json(novaTask)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Erro ao registrar task' })
    }
}

export async function excluirTask(req, res) {
    const { id } = req.params
    const db = await conectarDB()

    try {
        await db.run(
            `DELETE FROM tasks WHERE id = (?)`, [id]
        )
        res.status(200).json({ message: 'Task excluida' })
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir task' })
    }
}

export async function listarTask(req, res) {
    const db = await conectarDB()
    const usuario_id = req.user.id

    try {
        const tasks = await db.all(
            `SELECT * FROM tasks WHERE usuario_id = ?`, [usuario_id]
        )
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar tasks' })
    }
}

export async function atualizarTask(req, res) {
    const { id } = req.params
    const { titulo, descricao, prazo } = req.body
    const db = await conectarDB()

    try {
        const task = await db.get(`SELECT * FROM tasks WHERE id = ?`, [id])
        if (!task) {
            return res.status(404).json({ error: 'Task nao encontrada' })
        }

        const novoTitulo = (titulo !== undefined && titulo.trim() !== '') ? titulo : task.titulo;
        const novaDescricao = (descricao !== undefined && descricao.trim() !== '') ? descricao : task.descricao;
        const novoPrazo = (prazo !== undefined && prazo.trim() !== '') ? prazo : task.prazo;

        await db.run(
            `UPDATE tasks
            SET titulo = ?, descricao = ?, prazo = ?
            WHERE id = ?`,
            [novoTitulo, novaDescricao, novoPrazo, id]
        )
        res.status(200).json({ message: 'Task atualizada' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar task' });
    }
}