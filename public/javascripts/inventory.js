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
                document.getElementById('success-message').textContent = data.message;
                document.getElementById('success-message').style.display = 'block';
                document.getElementById('error-message').style.display = 'none';
                this.reset();
            } else {
                document.getElementById('error-message').textContent = data.message;
                document.getElementById('error-message').style.display = 'block';
                document.getElementById('success-message').style.display = 'none';
            }
        } catch (error) {
            document.getElementById('error-message').textContent = 'An error occurred while adding the category.';
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('success-message').style.display = 'none';
        }
    });
