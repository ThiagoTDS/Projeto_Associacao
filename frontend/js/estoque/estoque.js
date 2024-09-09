document.addEventListener('DOMContentLoaded', () => {
    const tabelaEstoque = document.getElementById('tabela-estoque');
    const doarCestaBtn = document.getElementById('doarCestaBtn');

    // Função para carregar os dados da tabela
    function carregarEstoque() {
        fetch('http://127.0.0.1:5000/get_estoque')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na rede: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log('Dados recebidos:', data); // Verifica o que está sendo retornado
                const corpoTabela = document.getElementById('tabela-corpo');
                corpoTabela.innerHTML = '';  // Limpa o conteúdo existente
                
                // Verifica se data é um array
                if (Array.isArray(data)) {
                    data.forEach(item => {
                        // Verifica se 'item' é um objeto e contém as propriedades esperadas
                        if (item && typeof item === 'object') {
                            const { id_cesta_cadastro_fk, quantidade_disponivel, data_proximo_vencimento, nome } = item;
                            const tr = document.createElement('tr');
                            tr.setAttribute('data-id', id_cesta_cadastro_fk);
                            tr.setAttribute('data-quantidade', quantidade_disponivel);

                            tr.innerHTML = `
                                <td>${id_cesta_cadastro_fk || 'Não disponível'}</td>
                                <td>${quantidade_disponivel || 'Não disponível'}</td>
                                <td>${data_proximo_vencimento || 'Não disponível'}</td>
                                <td>${nome || 'Não disponível'}</td>
                            `;
                            corpoTabela.appendChild(tr);
                        } else {
                            console.error('Formato de item inválido:', item);
                        }
                    });
                } else {
                    console.error('Dados recebidos não são um array:', data);
                }
            })
            .catch(error => {
                console.error('Erro ao carregar dados:', error);
                alert('Erro ao carregar os dados do estoque. Verifique o console para mais detalhes.');
            });
    }

    carregarEstoque();

    tabelaEstoque.addEventListener("click", (event) => {
        const row = event.target.closest('tr');
        if (row) {
            const id = row.getAttribute('data-id');
            const quantidade = row.getAttribute('data-quantidade');

            // Remove a classe 'selected' de todas as linhas
            document.querySelectorAll('#tabela-estoque tr').forEach(tr => tr.classList.remove('selected'));
            // Adiciona a classe 'selected' à linha clicada
            row.classList.add('selected');

            // Adiciona um ouvinte de evento ao botão "Doar Cesta" para registrar a doação
            doarCestaBtn.onclick = () => {
                doacaoCesta(id, quantidade, row);
            };
        }
    });

    function doacaoCesta(id, quantidade, row) {
        // Envia os dados da cesta para a tabela cestas_entregues e remove da tabela estoque
        fetch('http://127.0.0.1:5000/add_entrega', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_cesta_cadastro_fk: parseInt(id, 10),
                quantidade_entregue: parseInt(quantidade, 10),
                data_saida: new Date().toISOString().split('T')[0] // Data atual no formato YYYY-MM-DD
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.message) {
                alert(data.message);
                console.log(row)
                // Remover a linha da tabela-estoque
                row.remove();

                // Recarregar os dados atualizados da tabela estoque
                carregarEstoque();
            } else {
                alert('Erro ao registrar a entrega.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao registrar a entrega. Verifique o console para mais detalhes.');
        });
    }
});
