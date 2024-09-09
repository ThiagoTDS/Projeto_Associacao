document.addEventListener("DOMContentLoaded", function() {
    fetch('http://127.0.0.1:5000/get_doacoes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Verifique o formato dos dados recebidos

            // Adapte o código para exibir os dados na tabela
            const tabela = document.getElementById('tabela-doacoes');
            data.forEach(item => {
                const row = tabela.insertRow();
                row.insertCell().textContent = item.nome;
                row.insertCell().textContent = item.documento;
                row.insertCell().textContent = item.quantidade_doadas;
            });
        })
        .catch(error => {
            console.error('Erro ao carregar doações:', error);
        });
});
