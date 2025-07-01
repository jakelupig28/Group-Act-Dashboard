const express = require("express");
const mysql2 = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// db connection

const db = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "dashboardd_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err) => {
  if (err) {
    console.log("Database connection failed", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

//Register

app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const checkUserSql = "SELECT * FROM account WHERE username = ?";
  db.query(checkUserSql, [username], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const insertUserSql = "INSERT INTO account (username, password, role) VALUES (?,?, ?)";
    db.query(insertUserSql, [username, hashedPassword, role], (err, result) => {
      if (err) return res.status(500).json({ message: "Registration Failed" });

      res.status(201).json({ message: "User registered Successfully" });
    });
  });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "SELECT * FROM account WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },  // role is included in the token
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Log to confirm that role is included in the response
    console.log("Login response:", { token, username: user.username, role: user.role });

    // Send the role along with username and token in the response
    res.json({
      message: "Login successful",
      token,
      username: user.username,
      role: user.role, // Ensure this is being sent back
    });
  });
});



app.post('/api/send-email', async (req, res) =>{
    const {to, subject, message } = req.body;

            try {
            const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS,
            } 

             });

             const mailOptions = {
                from: process.env.EMAIL_USER,
                to,
                subject,
                text: message
             }
             await transporter.sendMail(mailOptions);

             await db.execute(
                'INSERT INTO email_logs (recipient, subject, message, sent_at) VALUES (?,?,?, NOW())',
                [to, subject, message]
             );
             res.json({ success: true, message: 'Email Sent logged!'});

             }


            catch (error) {
                console.error(error);
                res.status(500).json({success: false, message: 'Failed to send the email'})
            }
       
});


app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});