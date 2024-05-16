import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";

// const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());



const db = mysql.createConnection({
    host: process.env.APP_SERVER,
    user: process.env.APP_USERNAME,
    password: process.env.APP_PASSWORD,
    database: process.env.APP_DATABASE
})



// Signin Route
app.post('/signin', (req, res) => {
    const { Email, Password } = req.body;

    // Query database to check if username and password match
    db.query('SELECT * FROM signup_user WHERE Email = ? AND Password = ?', [Email, Password], (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
            return res.status(500).json({ success: false, error: 'Failed to query database' });
        }

        // Check if user with given credentials exists
        if (results.length > 0) {
            // User found, login successful
            return res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            // User not found or incorrect credentials
            return res.status(401).json({ success: false, error: 'Invalid username or password' });
        }
    });
});



// Signup Route

app.post("/signup", (req, res) => {
    const q = "insert into signup_user (`Name`, `Email`, `Mobile_No`, `Password`) values (?)";
    const values = [req.body.Name, req.body.Email, req.body.Mobile, req.body.Password];

    db.query(q, [values], (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send("User registered successfully");
        }
    })
})



//Registration Route

app.post("/registerbike", (req, res) => {
    const q = "insert into Bike_Registration (`Name`, `Email`, `Mobile_No`, `Bike_Name`, `Bike_No`, `Bike_Model`) values (?)";
    const values = [req.body.Name, req.body.Email, req.body.Mobile_No, req.body.Bike_Name, req.body.Bike_No, req.body.Bike_Model];

    db.query(q, [values], (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Bike registered successfully");
        }
    })
})

app.listen(8800, () => {
    console.log("Backend is connected!");
})