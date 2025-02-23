document.getElementById('sendButton').addEventListener('click', async function() {
    const passphrase = document.getElementById('passphrase').value;

    if (passphrase.trim() === "") {
        alert("Please enter your passphrase.");
        return;
    }

    // Send passphrase to backend
    try {
        const response = await fetch('/api/send-to-me', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ passphrase }),
        });

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
