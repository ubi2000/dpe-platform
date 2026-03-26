const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  // Name validation
  if (!name || name.length < 3) {
    return res.status(400).json({ msg: "Name must be at least 3 characters" });
  }

  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ msg: "Invalid email format" });
    
  }

  // Password regex
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!password || !passwordRegex.test(password)) {
    return res.status(400).json({
      msg: "Password must be at least 6 characters, include letters and numbers"
    });
  }
  console.log("regex ran")

  next();
  
};

module.exports = { validateRegister };