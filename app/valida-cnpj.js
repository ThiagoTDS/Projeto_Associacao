export default function validaCNPJ(campo) {
    const cnpj = campo.value.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
        campo.setCustomValidity('CNPJ inválido');
        return;
    }

    const calcularDigito = (cnpj, peso) => {
        let soma = 0;
        for (let i = 0; i < peso.length; i++) {
            soma += cnpj[i] * peso[i];
        }
        const resultado = (soma % 11);
        return resultado < 2 ? 0 : 11 - resultado;
    };

    const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const digito1 = calcularDigito(cnpj, pesos1);
    const digito2 = calcularDigito(cnpj + digito1, pesos2);

    if (cnpj[12] == digito1 && cnpj[13] == digito2) {
        campo.setCustomValidity('');
    } else {
        campo.setCustomValidity('CNPJ inválido');
    }
}
