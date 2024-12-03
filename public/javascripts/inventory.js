// Add this at the beginning of your existing JavaScript file
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.header-tabs').classList.toggle('active');
});

// Close mobile menu when a tab is clicked
document.querySelectorAll('.header-tabs li').forEach(tab => {
    tab.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            document.querySelector('.header-tabs').classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const header = document.querySelector('.header');
    const isClickInside = header.contains(event.target);
    
    if (!isClickInside && window.innerWidth <= 768) {
        document.querySelector('.header-tabs').classList.remove('active');
    }
});

document.querySelectorAll('.header-tabs li').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.header-tabs li').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                tab.classList.add('active');
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });

document.getElementById('add-category-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const categoryName = formData.get('categoryName');

    try {
        const response = await fetch('/admin/add-category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categoryName })
        });

        const data = await response.json();
        
        if (data.success) {
            showAlert('success-message', data.message);
            this.reset();
        } else {
            showAlert('error-message', data.message);
        }
    } catch (error) {
        showAlert('error-message', 'An error occurred while adding the genre.');
    }
});

function showAlert(elementId, message) {
    // Hide all alerts first
    document.querySelectorAll('.alert').forEach(alert => {
        alert.classList.remove('show');
        alert.style.display = 'none';
    });

    // Show the target alert
    const alertElement = document.getElementById(elementId);
    alertElement.textContent = message;
    alertElement.style.display = 'flex';
    setTimeout(() => alertElement.classList.add('show'), 10);

    // Auto hide after 5 seconds
    setTimeout(() => {
        alertElement.classList.remove('show');
        setTimeout(() => {
            alertElement.style.display = 'none';
        }, 300);
    }, 5000);
}
