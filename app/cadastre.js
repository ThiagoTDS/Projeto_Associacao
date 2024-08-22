import ehUmCPF from './valida-cpf.js';
import validaNome from './valida-nome.js';
import validaCNPJ from './valida-cnpj.js';
import validaDatas from './valida-datas.js';
import validaQuantidade from './valida-quantidade.js';
import validaEndereco from './valida-endereco.js';

window.mostrarCampo = function(tipo) {
    const cpfInput = document.getElementById('cpf_numero');
    const cnpjInput = document.getElementById('cnpj_numero');
    const cpfErrorMessage = document.getElementById('cpf_error_message');
    const cnpjErrorMessage = document.getElementById('cnpj_error_message');

    if (tipo === 'cpf') {
        cpfInput.style.display = 'block';
        cnpjInput.style.display = 'none';
        cpfErrorMessage.style.display = 'none'; 
        cnpjErrorMessage.style.display = 'none';
        cnpjInput.value = ''; // Limpa o campo CNPJ ao selecionar CPF
        cnpjInput.style.backgroundColor = 'var(--background-unfilled-input)';
    } else if (tipo === 'cnpj') {
        cnpjInput.style.display = 'block';
        cpfInput.style.display = 'none';
        cpfErrorMessage.style.display = 'none';
        cnpjErrorMessage.style.display = 'none';
        cpfInput.value = ''; // Limpa o campo CPF ao selecionar CNPJ
        cpfInput.style.backgroundColor = 'var(--background-unfilled-input)';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    const cancelarButton = document.getElementById('cancelar-botao');
    const submitButton = document.getElementById('submit-botao');
    const cpfInput = document.getElementById('cpf_numero');
    const cpfErrorMessage = document.getElementById('cpf_error_message');
    const nomeInput = document.getElementById('nome_completo');
    const cnpjInput = document.getElementById('cnpj_numero');
    const cnpjErrorMessage = document.getElementById('cnpj_error_message');
    const quantidadeInput = document.getElementById('quantidade_cestas');
    const quantidadeErrorMessage = document.getElementById('quantidade_error_message');
    const enderecoInput = document.getElementById('endereco');
    const enderecoErrorMessage = document.getElementById('endereco_error_message');

    if (nomeInput) {
        nomeInput.addEventListener('input', function() {
            validaNome(this);
            const nomeErrorMessage = document.getElementById('nome_error_message');
            nomeErrorMessage.textContent = this.validationMessage;
            nomeErrorMessage.style.display = this.validationMessage ? 'block' : 'none';
        });
    }

    if (cnpjInput) {
        cnpjInput.addEventListener('input', function() {
            validaCNPJ(this);
            cnpjErrorMessage.textContent = this.validationMessage;
            cnpjErrorMessage.style.display = this.validationMessage ? 'block' : 'none';
        });
    }

    if (quantidadeInput) {
        quantidadeInput.addEventListener('input', function() {
            validaQuantidade(this);
        });
    }

    if (enderecoInput) {
        enderecoInput.addEventListener('input', function() {
            validaEndereco(this);
        });
    }

    validaDatas();

    function updateButtonStyles() {
        let allFilled = true;
        let anyFilled = false;

        const visibleInputs = Array.from(inputs).filter(input => input.style.display !== 'none');

        visibleInputs.forEach(input => {
            if (input.value === '') {
                allFilled = false;
            } else {
                anyFilled = true;
            }
        });

        cancelarButton.style.backgroundColor = anyFilled ? 'var(--background-cancel-button)' : 'var(--background-inactive-button)';
        submitButton.style.backgroundColor = allFilled ? 'var(--background-confirm-button)' : 'var(--background-inactive-button)';

        submitButton.disabled = !allFilled;
    }

    updateButtonStyles();

    inputs.forEach(input => {
        if (input.value !== '') {
            input.style.backgroundColor = 'var(--background-fulled-input)';
        }

        input.addEventListener('input', function() {
            this.style.backgroundColor = this.value ? 'var(--background-fulled-input)' : 'var(--background-unfilled-input)';
            updateButtonStyles();
        });
    });

    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            ehUmCPF(this);
            cpfErrorMessage.textContent = this.validationMessage;
            cpfErrorMessage.style.display = this.validationMessage ? 'block' : 'none';
        });
    }

    if (cancelarButton) {
        cancelarButton.addEventListener('click', function() {
            cpfErrorMessage.style.display = 'none';
            cnpjErrorMessage.style.display = 'none';
            quantidadeErrorMessage.style.display = 'none';
            enderecoErrorMessage.style.display = 'none';
            inputs.forEach(input => {
                input.style.backgroundColor = 'var(--background-unfilled-input)';
            });
            updateButtonStyles();
        });
    }
});
