export default function validaNome(campo) {
    const nome = campo.value.trim();
    const nomeRegex = /^[A-Za-zÀ-ÖØ-ÿ\s]+$/; // Permite letras e espaços

    if (nome.length < 4) {
        campo.setCustomValidity('O nome deve ter pelo menos 4 caracteres');
    } else if (!nomeRegex.test(nome)){
        campo.setCustomValidity('O nome deve conter apenas letras e espaços.')
    } else{
        campo.setCustomValidity('');// Limpa a mensagem de erro se o nome for válido
    }
}