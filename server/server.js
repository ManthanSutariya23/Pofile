const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
    const { name, email, message, subject } = req.body;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        secure: false,
        auth: {
            user: 'manthan.j.sutariya@gmail.com',
            pass: 'bhjhxchvszenuspn',
        },
    });

    let info = await transporter.sendMail({
        from: 'manthan.j.sutariya@gmail.com',
        to: "manthan.sutariya.uk@gmail.com",
        subject: subject,
        text: `message from ${name} <${email}>: <br/> <br/>${message}`,
    });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
