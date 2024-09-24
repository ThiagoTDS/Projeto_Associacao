document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1:5000/api/estoque')
        .then(response => response.json())
        .then(data => {
            console.log('Estoque:', data);
            // Aqui você pode atualizar o DOM com os dados recebidos
        })
        .catch(error => console.error('Erro ao buscar estoque:', error));
});

function addDoador(doador) {
    fetch('http://127.0.0.1:5000/api/doador', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doador)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta da API:', data);
        // Atualize o DOM com uma mensagem de sucesso ou erro
    })
    .catch(error => console.error('Erro ao adicionar doador:', error));
}

// Exemplo de uso
const doador = {
    nome: 'João Silva',
    cpf: '12345678905',
    endereco: 'Rua A, 123',
    data_doacao: '2024-09-06',
    data_proximo_vencimento: '2024-12-31',
    quantidade_cesta: 5
};

addDoador(doador);j