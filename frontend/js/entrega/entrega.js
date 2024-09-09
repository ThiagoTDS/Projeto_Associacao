function carregarEntregas() {
    fetch('http://127.0.0.1:5000/get_entregas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const corpoTabela = document.getElementById('tabela-entrega');
            corpoTabela.innerHTML = '';  // Limpa o conteúdo existente
            data.forEach(item => {
                const { id_cesta, nome_doador, data_saida_estoque, quantidade_entregue } = item;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${id_cesta || 'Não disponível'}</td>
                    <td>${nome_doador || 'Não disponível'}</td>
                    <td>${data_saida_estoque || 'Não disponível'}</td>
                    <td>${quantidade_entregue || 'Não disponível'}</td>
                `;
                corpoTabela.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar dados:', error);
            alert('Erro ao carregar os dados das entregas. Verifique o console para mais detalhes.');
        });
}

// Carregar os dados quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    carregarEntregas();
});