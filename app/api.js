const form = document.getElementById('cadastro-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);   


    try {
        const   
 response = await fetch('/api/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const message = await response.json();   

            alert(message.message);   

            // Clear form or redirect as needed
        } else {
            console.error('Error creating cadastro:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
