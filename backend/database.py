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

