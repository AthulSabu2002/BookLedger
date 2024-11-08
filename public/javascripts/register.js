const form = document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    if (usernameInput.value.trim() === '' || passwordInput.value.trim() === '' || confirmPasswordInput.value.trim() === '') {
        errorMessage.textContent = 'Please fill in all the fields.';
    } else if (passwordInput.value !== confirmPasswordInput.value) {
        errorMessage.textContent = 'Passwords do not match.';
    } else {
        errorMessage.textContent = '';


        const formData = {
            username: usernameInput.value.trim(),
            password: passwordInput.value.trim()
        };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                alert('Registration successful! Redirecting to login...');
                window.location.href = '/login'; 
            } else {
                const errorData = await response.json();
                errorMessage.textContent = errorData.message || 'Registration failed. Please try again.';
            }
        } catch (error) {
            console.error('Error during registration:', error);
            errorMessage.textContent = 'An error occurred during registration. Please try again later.';
        }
    }
});
