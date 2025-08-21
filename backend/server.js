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
        const [result] = await connection.execute(
            'INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
        // Fetch the full post including created_at 
        const [rows] = await connection.execute(
            'SELECT * FROM posts WHERE id = ?', [result.insertId]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});
app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const connection = await db;
        const [result] = await connection.execute(
            'UPDATE posts SET title = ?, content = ? WHERE id = ?',
            [title, content, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json({ id, title, content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});



app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await db;
        const [result] = await connection.execute(
            'DELETE FROM posts WHERE id = ?',
            [id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});


app.get('/posts', async (req, res) => {
    try {
        const connection = await db;
const [rows] = await connection.execute('SELECT * FROM posts ORDER BY created_at DESC');
res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});


app.listen(5000, () => console.log('🚀 Server running on port 5000'));