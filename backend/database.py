import sqlite3
import os
from sqlite3 import Error


def create_connection():
    """ Cria uma conexão com o banco de dados SQLite """
    conn = None
    try:
        # Caminho absoluto para o arquivo app.db
        db_path = os.path.join(os.path.dirname(__file__), 'database', 'app.db')
        conn = sqlite3.connect(db_path)
    except Error as e:
        print(e)
    return conn

def close_connection(conn):
    """Fecha a conexão com o banco de dados SQLite."""
    if conn:
        conn.close()

def execute_script(conn, script):
    """Executa um script SQL no banco de dados."""
    try:
        cursor = conn.cursor()
        cursor.executescript(script)
        conn.commit()
    except Error as e:
        print(f"Erro ao executar script: {e}")
        conn.rollback()

def inserir_doador(nome, cpf, cnpj, endereco, data_doacao, data_proximo_vencimento, quantidade_cesta):
    """Insere um novo doador na tabela 'doadores' e atualiza a tabela 'estoque'."""
    try:
        conn = create_connection()
        cursor = conn.cursor()

        cursor.execute('''
            INSERT INTO doadores (nome, cpf, cnpj, endereco, data_doacao, data_proximo_vencimento, quantidade_cesta)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (nome, cpf, cnpj, endereco, data_doacao, data_proximo_vencimento, quantidade_cesta))

         # Pegar o id_cesta recém-inserido
        id_cesta_cadastro_fk = cursor.lastrowid
        print(f"Novo id_cesta inserido: {id_cesta_cadastro_fk}")  # Log para verificar se o ID está sendo capturado corretamente

        # Atualizar ou inserir a informação na tabela 'estoque'
        cursor.execute('''
            INSERT INTO estoque (id_cesta_cadastro_fk, quantidade_disponivel, data_proximo_vencimento, nome)
            VALUES (?, ?, ?, ?)
        ''', (id_cesta_cadastro_fk, quantidade_cesta, data_proximo_vencimento, nome))

        conn.commit()
    except Error as e:
        print(f"Erro ao inserir doador: {e}")
        conn.rollback()
    finally:
        close_connection(conn)

def obter_estoque():
    """Obtém todos os itens da tabela 'estoque'."""
    try:
        conn = create_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT * FROM estoque')
        rows = cursor.fetchall()

        columns = [description[0] for description in cursor.description]
        estoque = [dict(zip(columns, row)) for row in rows]

        close_connection(conn)
        return estoque
    except Error as e:
        print(f"Erro ao obter estoque: {e}")
        close_connection(conn)
        return []
    
def registrar_entrega(id_cesta, quantidade_entregue, data_saida):
    """Registra uma nova entrega na tabela 'cestas_entregues' e remove da tabela 'estoque'."""
    try:
        conn = create_connection()
        cursor = conn.cursor()

        # Verificar se a cesta existe no estoque
        cursor.execute("SELECT * FROM estoque WHERE id_cesta_cadastro_fk = ?", (id_cesta,))
        cesta = cursor.fetchone()

        if not cesta:
            raise Exception("Cesta não encontrada no estoque.")

        # Inserir a entrega na tabela cestas_entregues
        cursor.execute('''
            INSERT INTO cestas_entregues (id_cesta_cadastro_fk, data_saida_estoque, quantidade_entregue)
            VALUES (?, ?, ?)
        ''', (id_cesta, data_saida, quantidade_entregue))

        # Excluir a cesta da tabela estoque
        cursor.execute("DELETE FROM estoque WHERE id_cesta_cadastro_fk = ?", (id_cesta,))

        conn.commit()
    except Error as e:
        print(f"Erro ao registrar entrega: {e}")
        conn.rollback()
    finally:
        close_connection(conn)
