const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const dbConfig = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users_db'
});
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await dbConfig.execute(
        'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
        [email, hashedPassword, 'user']
    );
    res.json({ message: "Пользователь зарегистрирован" });
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const [rows] = await dbConfig.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Ошибка входа" });
    }
    res.json({
        message: "Успешный вход",
        user: { id: user.id, email: user.email, role: user.role }
    });
});
app.listen(8001, () => {
    console.log("Сервис запущен на порту 8001");
});
