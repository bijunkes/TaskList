import sqlite3 from 'sqlite3'
import {open} from 'sqlite'

async function conectarDB() {
    const db = await open({
        filename: '../banco.db',
        driver: sqlite3.Database,
    })

    await db.exec(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            senha TEXT NOT NULL
        );    
    `)

    await db.exec(`
        CREATE TABLE IF NOT EXISTS Tasks (
            id INTEGER PRIMARY KEY,
            titulo TEXT NOT NULL,
            descricao TEXT NOT NULL,
            prazo DATE NOT NULL,
            usuario_id INTEGER NOT NULL,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        );
    `)
    
    return db
}

export default conectarDB
