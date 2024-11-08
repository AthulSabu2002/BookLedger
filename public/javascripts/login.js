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
                const data = await response.json();
                console.log('Form submitted successfully:', data);

                window.location.href = '/users/dashboard'; 
            } else {
                errorMessage.textContent = 'Invalid username or password. Please try again.';
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            errorMessage.textContent = 'An error occurred while submitting the form. Please try again later.';
        }
    }
});
