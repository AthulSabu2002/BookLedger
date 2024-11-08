const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (usernameInput.value.trim() === '' || passwordInput.value.trim() === '') {
        errorMessage.textContent = 'Please enter both username and password.';
    } else {
        try {
            // Sending form data to the server
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: usernameInput.value,
                    password: passwordInput.value
                })
            });

            if (response.ok) {
                // If the server returns a successful response
                const data = await response.json();
                console.log('Form submitted successfully:', data);

                // Redirect or handle success logic here
                window.location.href = '/dashboard'; // Example redirect
            } else {
                // Handle errors such as incorrect username/password
                errorMessage.textContent = 'Invalid username or password. Please try again.';
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            errorMessage.textContent = 'An error occurred while submitting the form. Please try again later.';
        }
    }
});
