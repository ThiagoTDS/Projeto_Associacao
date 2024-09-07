# backend/main.py

from backend.database import execute_script, insert_doador, fetch_estoque, registrar_entrega

# Executa o script SQL para criar as tabelas
execute_script('migrations/create_tables.sql')

# Insere um doador de exemplo
insert_doador(
    nome='Maria Silva',
    cpf='12345678907',
    cnpj=None,
    endereco='Rua AB, 123',
    data_doacao='2024-09-06',
    data_proximo_vencimento='2025-02-20',
    quantidade_cesta=32
)

# Consulta o estoque
estoque = fetch_estoque()
print("Estoque atual antes da entrega:", estoque)

# Registra uma entrega de 3 cestas
registrar_entrega(id_cesta=2, quantidade_entregue=3, data_saida='2024-09-07')

# Consulta o estoque após a entrega
estoque = fetch_estoque()
print("Estoque atual após a entrega:", estoque)
