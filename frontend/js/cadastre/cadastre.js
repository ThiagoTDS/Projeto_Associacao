import validaNome from '/frontend/js/validation/valida-nome.js';
import ehUmCPF from '/frontend/js/validation/valida-cpf.js';
import validaCNPJ from '/frontend/js/validation/valida-cnpj.js';
import validaEndereco from '/frontend/js/validation/valida-endereco.js';
import validaDatas from '/frontend/js/validation/valida-datas.js';
import validaQuantidade from '/frontend/js/validation/valida-quantidade.js';
// Função para mostrar/ocultar campos de CPF e CNPJ
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
};
// Função para atualizar a cor de fundo dos inputs com base no valor
function updateInputBackground(input) {
    input.style.backgroundColor = input.value ? 'var(--background-fulled-input)' : 'var(--background-unfilled-input)';
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

    // Valida e exibe mensagens de erro para o nome
    if (nomeInput) {
        nomeInput.addEventListener('input', function() {
            validaNome(this);
            const nomeErrorMessage = document.getElementById('nome_error_message');
            nomeErrorMessage.textContent = this.validationMessage;
            nomeErrorMessage.style.display = this.validationMessage ? 'block' : 'none';
        });
    }

    // Valida e exibe mensagens de erro para o CNPJ
    if (cnpjInput) {
        cnpjInput.addEventListener('input', function() {
            validaCNPJ(this);
            cnpjErrorMessage.textContent = this.validationMessage;
            cnpjErrorMessage.style.display = this.validationMessage ? 'block' : 'none';
        });
    }

    // Valida a quantidade de cestas
    if (quantidadeInput) {
        quantidadeInput.addEventListener('input', function() {
            validaQuantidade(this);
        });
    }

    // Valida o endereço
    if (enderecoInput) {
        enderecoInput.addEventListener('input', function() {
            validaEndereco(this);
        });
    }

    // Valida datas ao carregar a página
    validaDatas();

    // Atualiza os estilos dos botões com base no preenchimento dos campos
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

        cancelarButton.style.display = anyFilled ? 'block' : 'none';
        submitButton.style.display = allFilled ? 'block' : 'none';
        submitButton.disabled = !allFilled; 
    }

    updateButtonStyles();

    // Atualiza a cor de fundo dos inputs e estilos dos botões
    inputs.forEach(input => {
        updateInputBackground(input);

        input.addEventListener('input', function() {
            updateInputBackground(this);
            updateButtonStyles();
        });
    });

    // Valida e exibe mensagens de erro para o CPF
    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            ehUmCPF(this);
            cpfErrorMessage.textContent = this.validationMessage;
            cpfErrorMessage.style.display = this.validationMessage ? 'block' : 'none';
        });
    }

    // Limpa campos e estilos ao clicar no botão cancelar
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

document.getElementById('cadastreForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
  
    // Capturar os dados do formulário
    const formData = {
      nome_completo: document.getElementById('nome_completo').value,
      cpf: document.getElementById('cpf_numero').value || null,
      cnpj: document.getElementById('cnpj_numero').value || null,
      endereco: document.getElementById('endereco').value,
      data_doacao: document.getElementById('data_doacao_entrada').value,
      data_validade: document.getElementById('data_validade_entrada').value,
      quantidade_cestas: document.getElementById('quantidade_cestas').value
    };
  
    // Enviar os dados para o backend usando fetch
    fetch('http://127.0.0.1:5000/add_doador', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert('Doador cadastrado com sucesso!');
      } else {
        alert('Ocorreu um erro: ' + data.error);
      }
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
});
