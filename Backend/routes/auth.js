const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const pool = require('../db');
const authorizeRoles = require('../middlewares/authMiddleware');
const router = express.Router();

router.post(
  '/register',
  [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    check('role', 'Invalid role').isIn(['student', 'teacher', 'administrator']) // Validate role
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, role } = req.body; 

    try {
      const [existingUser] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const [existingEmail] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (existingEmail.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', 
                       [username, email, hashedPassword, role || 'student']); // Default to student if not provided

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// <---- Missing closing parenthesis for /register route

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [user] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user[0].id, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token,
      role: user[0].role, // Include the user's role in the response
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
