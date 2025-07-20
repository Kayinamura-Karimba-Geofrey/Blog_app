const user = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config'); 


exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    
    const existing = await user.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });

    
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role || 'user',
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const existing = await user.findOne({ email });
    if (!existing) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    const isMatch = await bcrypt.compare(password, existing.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    const token = jwt.sign(
      { id: existing._id, role: existing.role },
      JWT_SECRET, 
      { expiresIn: '1d' }
    );

    
    res.json({
      token,
      user: {
        id: existing._id,
        name: existing.name,
        email: existing.email,
        role: existing.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message,
    });
  }
};
