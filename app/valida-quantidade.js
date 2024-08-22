export default function validaQuantidade(campo) {
    const quantidade = campo.value;
    const quantidadeErrorMessage = document.getElementById('quantidade_error_message');
    const regexQuantidade = /^[1-9]\d*$/; // Aceita números inteiros positivos

    if (!regexQuantidade.test(quantidade)) {
        quantidadeErrorMessage.textContent = 'A quantidade deve ser um número inteiro positivo igual a 1 ou superior.';
        quantidadeErrorMessage.style.display = 'block';
    } else {
        quantidadeErrorMessage.textContent = '';
        quantidadeErrorMessage.style.display = 'none';
    }
}

