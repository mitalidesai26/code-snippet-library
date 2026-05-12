const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
  console.error("FULL ERROR:", err); // 👈 ADD THIS
  res.status(500).json({ message: 'Server error', error: err.message });
  }
  console.log("Signup API hit");
  console.log(req.body);
};
