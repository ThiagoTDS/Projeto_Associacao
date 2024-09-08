from database import create_connection, close_connection
from sqlite3 import Error
from datetime import datetime

def registrar_entrega(id_cesta, quantidade_entregue):
    conn = create_connection()
    if conn:
        try:
            cursor = conn.cursor()

            # Verifica a quantidade disponível no estoque
            cursor.execute('''
                SELECT quantidade_disponivel FROM estoque WHERE id_cesta_cadastro_fk = ?
            ''', (id_cesta,))
            estoque_atual = cursor.fetchone()

            if estoque_atual is None:
                raise ValueError(f"ID da cesta {id_cesta} não encontrado no estoque.")

            quantidade_disponivel = estoque_atual[0]

            # Verifica se a quantidade a ser entregue é válida
            if quantidade_entregue > quantidade_disponivel:
                raise ValueError(f"Quantidade a ser entregue ({quantidade_entregue}) excede o estoque disponível ({quantidade_disponivel}).")

            # Atualiza o estoque, subtraindo a quantidade entregue
            nova_quantidade_disponivel = quantidade_disponivel - quantidade_entregue
            cursor.execute('''
                UPDATE estoque SET quantidade_disponivel = ? WHERE id_cesta_cadastro_fk = ?
            ''', (nova_quantidade_disponivel, id_cesta))

            # Registra a entrega na tabela cestas_entregues
            cursor.execute('''
                INSERT INTO cestas_entregues (id_cesta_cadastro_fk, data_saida_estoque, quantidade_entregue)
                VALUES (?, ?, ?)
            ''', (id_cesta, datetime.now(), quantidade_entregue))

            conn.commit()
            print("Entrega registrada e estoque atualizado com sucesso.")
        except Error as e:
            print(f"Erro ao registrar entrega: {e}")
            conn.rollback()  # Reverter em caso de erro
        except ValueError as ve:
            print(f"Erro: {ve}")
        finally:
            close_connection(conn)
