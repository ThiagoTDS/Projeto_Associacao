 # Funções relacionadas ao estoque
# saida_por_validade_quebra(deletar)

from database import obter_estoque, registrar_entrega

def get_estoque():
    """Obtém todos os itens da tabela 'estoque' através da função do módulo database."""
    return obter_estoque()

def add_entrega(id_cesta, quantidade_entregue, data_saida):
    """Registra uma nova entrega e remove a cesta do estoque."""
    registrar_entrega(id_cesta, quantidade_entregue, data_saida)
