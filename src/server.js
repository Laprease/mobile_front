import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const app = express();
app.use(express.json());
// 精确配置CORS
const corsOptions = {
    origin: ['http://localhost:3301','http://localhost:5173','127.0.0.1:7890','https://mobile-front-tawny.vercel.app:7890'], // 必须明确指定前端地址
    credentials: true, // 允许携带凭证
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
  
app.use(cors(corsOptions));

// 增加预检请求处理
// 为每个需要跨域的路由单独配置
app.options('/api/login', cors(corsOptions));
app.options('/api/register', cors(corsOptions));

// 数据库配置
const pool = mysql.createPool({
  // host: 'localhost',
  // user: 'root',
  // password: '123456',
  // database: 'user_database',
  host: 'db4free.net',
  user: 'hyvine',
  password: '12345678',
  database: 'hyvin_database',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 登录接口
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.query(
      'SELECT * FROM user_table WHERE username = ?',
      [username]
    );
    
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: '用户不存在' });
    }

    const isValid = await bcrypt.compare(password, rows[0].password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: '密码错误' });
    }

    res.json({
        data: {
          success: true,
          message: '登录成功'
        },
        status: 200
      })
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 注册接口
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [existing] = await pool.query(
      'SELECT * FROM user_table WHERE username = ?',
      [username]
    );

    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: '用户名已存在' });
    }

    await pool.query(
      'INSERT INTO user_table (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    res.json({
        data: {
          success: true,
          message: '登录成功'
        },
        status: 200
      })
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: '注册失败' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});