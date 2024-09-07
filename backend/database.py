import sqlite3
from sqlite3 import Error

DATABASE = 'database/app.db'

def create_connection():
    """Cria uma conexão com o banco de dados SQLite."""
    conn = None
    try:
        conn = sqlite3.connect(DATABASE)
        print("Conexão com o banco de dados SQLite foi estabelecida.")
    except Error as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
    return conn

def close_connection(conn):
    """Fecha a conexão com o banco de dados."""
    if conn:
        conn.close()

def execute_script(script_path):
    """Executa um script SQL para criação de tabelas."""
    conn = create_connection()
    if conn:
        try:
            with open(script_path, 'r') as sql_file:
                sql_script = sql_file.read()
            cursor = conn.cursor()
            cursor.executescript(sql_script)
            print("Script de criação de tabelas executado com sucesso.")
        except Error as e:
            print(f"Erro ao executar o script SQL: {e}")
        finally:
            close_connection(conn)

def insert_doador(nome, cpf, cnpj, endereco, data_doacao, data_proximo_vencimento, quantidade_cesta):
    conn = create_connection()
    if conn:
        try:
            cursor = conn.cursor()
            # Insere o doador na tabela doadores
            cursor.execute('''
                INSERT INTO doadores (nome, cpf, cnpj, endereco, data_doacao, data_proximo_vencimento, quantidade_cesta)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (nome, cpf, cnpj, endereco, data_doacao, data_proximo_vencimento, quantidade_cesta))
            
            # Pega o ID do último doador inserido
            doador_id = cursor.lastrowid
            print(f"ID do doador inserido: {doador_id}")

            # Insere a quantidade de cestas no estoque, referenciando o id_cesta_cadastro_fk do doador
            cursor.execute('''
                INSERT INTO estoque (id_cesta_cadastro_fk, quantidade_disponivel, data_proximo_vencimento, nome)
                VALUES (?, ?, ?, ?)
            ''', (doador_id, quantidade_cesta, data_proximo_vencimento, nome))
            
            conn.commit()
            print("Doador e estoque inseridos com sucesso.")
        except Error as e:
            print(f"Erro ao inserir doador e estoque: {e}")
        finally:
            close_connection(conn)

def fetch_estoque():
    """Consulta o estoque de cestas."""
    conn = create_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT id_cesta_cadastro_fk, quantidade_disponivel, data_proximo_vencimento, nome FROM estoque''')
            rows = cursor.fetchall()
            return rows
        except Error as e:
            print(f"Erro ao consultar estoque: {e}")
        finally:
            close_connection(conn)
    return []

def registrar_entrega(id_cesta, quantidade_entregue, data_saida):
    conn = create_connection()
    if conn:
        try:
            cursor = conn.cursor()

            # Verifica a quantidade disponível no estoque
            cursor.execute('''
                SELECT quantidade_disponivel FROM estoque WHERE id_cesta_cadastro_fk = ?
            ''', (id_cesta,))
            estoque_atual = cursor.fetchone()

            print(f"Estoque atual para id_cesta {id_cesta}: {estoque_atual}")

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
            ''', (id_cesta, data_saida, quantidade_entregue))

            conn.commit()
            print("Entrega registrada e estoque atualizado com sucesso.")
        except Error as e:
            print(f"Erro ao registrar entrega: {e}")
        finally:
            close_connection(conn)
