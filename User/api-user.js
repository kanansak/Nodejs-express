const express = require('express');
const router = express.Router();
const db = require('../db'); // นำเข้าไฟล์การเชื่อมต่อ MySQL

// สร้างผู้ใช้งานใหม่
router.post('/users', (req, res) => {
  const { username, email } = req.body;

  const sql = 'INSERT INTO users (username, email) VALUES (?, ?)';
  db.query(sql, [username, email], (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการสร้างผู้ใช้: ' + err.message);
      res.status(500).send('เกิดข้อผิดพลาดในการสร้างผู้ใช้');
    } else {
      res.status(201).json({ message: 'สร้างผู้ใช้งานเรียบร้อยแล้ว' });
    }
  });
});

// อ่านข้อมูลผู้ใช้งานทั้งหมด
router.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการอ่านข้อมูลผู้ใช้: ' + err.message);
      res.status(500).send('เกิดข้อผิดพลาดในการอ่านข้อมูลผู้ใช้');
    } else {
      res.status(200).json(results);
    }
  });
});

// อัปเดตข้อมูลผู้ใช้งาน
router.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body;

  const sql = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
  db.query(sql, [username, email, userId], (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้: ' + err.message);
      res.status(500).send('เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้');
    } else {
      res.status(200).json({ message: 'อัปเดตข้อมูลผู้ใช้งานเรียบร้อยแล้ว' });
    }
  });
});

// ลบผู้ใช้งาน
router.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการลบผู้ใช้: ' + err.message);
      res.status(500).send('เกิดข้อผิดพลาดในการลบผู้ใช้');
    } else {
      res.status(200).json({ message: 'ลบผู้ใช้งานเรียบร้อยแล้ว' });
    }
  });
});

// Read user data by email with specific fields
router.get('/users/:email', (req, res) => {
  const email = req.params.email;

  const sql = 'SELECT id, name, email, role, level, `group` FROM users WHERE email = ?'; // Replace "username" with the correct column name
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error fetching user data by email: ' + err.message);
      res.status(500).send('Error fetching user data by email');
    } else if (result.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(result[0]);
    }
  });
});


module.exports = router;
