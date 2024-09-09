export default function validaEndereco(campo) {
    const endereco = campo.value;
    const enderecoErrorMessage = document.getElementById('endereco_error_message');
    const regexEndereco = /^[A-Za-z\s]+, \d{1,5} \- [A-Za-z\s]+ \( [A-Z]{2} \)$/;

    if (!regexEndereco.test(endereco)) {
        enderecoErrorMessage.textContent = 'Digite neste formato: Avenida Paulista, 1000 - São Paulo (SP)';
        enderecoErrorMessage.style.display = 'block';
    } else {
        enderecoErrorMessage.textContent = '';
        enderecoErrorMessage.style.display = 'none';
    }
}
