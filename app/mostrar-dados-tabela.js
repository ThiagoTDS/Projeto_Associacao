document.addEventListener('DOMContentLoaded', function () {
    fetch('/database/dados-cesta-teste.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        })
        .then(data => {
            const tabelaCorpo = document.getElementById('tabela-corpo');
            tabelaCorpo.innerHTML = ''; // Limpa o conteúdo existente

            data.forEach(item => {
                const tr = document.createElement('tr');

                const tdCodigo = document.createElement('td');
                tdCodigo.textContent = item.codigoCesta;

                const tdQuantidade = document.createElement('td');
                tdQuantidade.textContent = item.quantidade;

                const tdDataVencimento = document.createElement('td');
                tdDataVencimento.textContent = item.dataVencimento;

                tr.appendChild(tdCodigo);
                tr.appendChild(tdQuantidade);
                tr.appendChild(tdDataVencimento);

                tr.addEventListener('click', function(){
                    if(tr.classList.contains('selected')){
                        tr.classList.remove('selected');
                    } else{
                        tr.classList.add('selected');
                    }
                });
                tabelaCorpo.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});
