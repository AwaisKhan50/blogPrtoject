import express from 'express';
import mysql2 from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pakistan?1234',
    database: 'mysql_db'
})

// create an api for create post 

app.post('/posts', async (req, res) => {
    const { title, content } = req.body;
    try {
        const connection = await db;
        const [result] = await connection.execute('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
        res.status(201).json({ id: result.insertId, title, content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});


app.get('/posts', async (req, res) => {
    try {
        const connection = await db;
        const [rows] = await connection.execute('SELECT * FROM posts');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});


app.listen(5000, () => console.log('🚀 Server running on port 5000'));