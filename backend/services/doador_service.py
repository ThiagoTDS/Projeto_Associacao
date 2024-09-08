# Adicione funções para CRUD (Create, Read, Update, Delete) de doadores.
from database import inserir_doador

def adicionar_doador(nome, cpf, cnpj, endereco, data_doacao, data_validade, quantidade_cestas):
    try:
        inserir_doador(nome, cpf, cnpj, endereco, data_doacao, data_validade, quantidade_cestas)
    except Exception as e:
        print(f"Erro ao adicionar doador: {e}")
        raise
