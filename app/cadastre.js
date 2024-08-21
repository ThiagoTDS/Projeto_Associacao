function mostrarCampo(tipo) {
    const cpfInput = document.getElementById('cpf_numero');
    const cnpjInput = document.getElementById('cnpj_numero');

    if (tipo === 'cpf') {
        cpfInput.style.display = 'block';
        cpfInput.required = true;
        cnpjInput.style.display = 'none';
        cnpjInput.required = false;
        cnpjInput.value = ''; 
        cnpjInput.style.backgroundColor = 'var(--background-unfilled-input)';
    } else if (tipo === 'cnpj') {
        cnpjInput.style.display = 'block';
        cnpjInput.required = true;
        cpfInput.style.display = 'none';
        cpfInput.required = false;
        cpfInput.value = '';
        cpfInput.style.backgroundColor = 'var(--background-unfilled-input)';
    }

    updateButtonStyles();
}

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    const cancelarButton = document.getElementById('cancelar-botao');
    const submitButton = document.getElementById('submit-botao');

    function updateButtonStyles() {
        let allFilled = true;
        let anyFilled = false;

        inputs.forEach(input => {
            if (input.style.display !== 'none') {
                if (input.value === '') {
                    allFilled = false;
                } else {
                    anyFilled = true;
                }
            }
        });

        cancelarButton.style.backgroundColor = anyFilled ? 'var(--background-cancel-button)' : 'var(--background-inactive-button)';
        submitButton.style.backgroundColor = allFilled ? 'var(--background-confirm-button)' : 'var(--background-inactive-button)';
    }

    cancelarButton.addEventListener('click', function() {
        inputs.forEach(input => {
            if (input.value !== '') {
                input.value = '';
                input.style.backgroundColor = 'var(--background-unfilled-input)';
            }
        });
        updateButtonStyles(); // Atualiza o estilo dos botões após limpar os campos
    });

    updateButtonStyles();

    inputs.forEach(input => {
        if (input.style.display !== 'none' && input.value !== '') {
            input.style.backgroundColor = 'var(--background-fulled-input)';
        }

        input.addEventListener('input', function() {
            if (input.style.display !== 'none') {
                this.style.backgroundColor = this.value ? 'var(--background-fulled-input)' : 'var(--background-unfilled-input)';
                updateButtonStyles();
            }
        });
    });
});
