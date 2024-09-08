from flask import Flask, request, jsonify
from flask_cors import CORS
from services.doador_service import adicionar_doador
from services.entrega_service import registrar_entrega
from database import close_connection, create_connection, obter_estoque

app = Flask(__name__)
CORS(app)  # Habilita CORS para permitir requisições de outras origens (como o frontend)

# Rotas
@app.route('/add_doador', methods=['POST'])
def add_doador():
    data = request.get_json()

    # Imprimir os dados recebidos para depuração
    print('Dados recebidos:', data)

    nome = data.get('nome')
    cpf = data.get('cpf')
    cnpj = data.get('cnpj')
    endereco = data.get('endereco')
    data_doacao = data.get('data_doacao')
    data_validade = data.get('data_validade')
    quantidade_cestas = data.get('quantidade_cestas')

    # Lógica para inserir no banco de dados
    try:
        adicionar_doador(nome, cpf, cnpj, endereco, data_doacao, data_validade, quantidade_cestas)
        return jsonify({"message": "Doador adicionado com sucesso!"}), 201
    except Exception as e:
        error_message = str(e)
        
        if "UNIQUE constraint failed: doadores.cnpj" in error_message:
            return jsonify({"message": "CNPJ já cadastrado"}), 400
        
        return jsonify({"message": f"Erro ao inserir doador: {error_message}"}), 500
@app.route('/add_entrega', methods=['POST'])
def add_entrega():
    """
    Receber os dados selecionados da tabela estoque para a tabela cestas_entregues (ID da cesta, quantidade, data de saída).
    Inserir esses dados na tabela cestas_entregues.
    Excluir a cesta(que foi entregue) correspondente da tabela estoque.
    """
    data = request.get_json()
    print('Dados recebidos:', data)  # Adicione um log para verificar se os dados estão chegando
    
    id_cesta_cadastro_fk = data.get('id_cesta_cadastro_fk')
    quantidade_entregue = data.get('quantidade_entregue')
    data_saida = data.get('data_saida')

    conn = create_connection()
    try:
        registrar_entrega(id_cesta_cadastro_fk, quantidade_entregue, data_saida)
        return jsonify({"message": "Entrega registrada com sucesso!"}), 200

    except Exception as e:
        # conn.rollback()  # Reverter em caso de erro
        return jsonify({"message": f"Erro ao registrar a entrega: {str(e)}"}), 500
    finally:
        close_connection(conn)

@app.route('/get_estoque', methods=['GET'])
def get_estoque():
    try:
        estoque = obter_estoque()
        return jsonify(estoque), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_doacoes', methods=['GET'])
def get_doacoes():
    try:
        conn = create_connection()
        cursor = conn.cursor()
        
        # Consultar as doações no banco de dados
        cursor.execute('''
            SELECT
                e.nome,
                COALESCE(d.cpf, d.cnpj) AS documento,
                SUM(e.quantidade_disponivel) AS quantidade_doadas
            FROM
                estoque e
            JOIN
                doadores d ON e.id_cesta_cadastro_fk = d.id_cesta
            GROUP BY
                e.nome, documento;
        ''')
        rows = cursor.fetchall()
        
        # Processar os dados para retornar em formato JSON
        processed_rows = [
            {
                "nome": row[0],
                "documento": row[1],
                "quantidade_doadas": row[2]
            }
            for row in rows
        ]
        
        close_connection(conn)
        
        # Retorna os dados das doações como JSON
        return jsonify(processed_rows), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_entregas', methods=['GET'])
def get_entregas():
    try:
        conn = create_connection()
        cursor = conn.cursor()
        
        # Consultar as entregas no banco de dados
        cursor.execute('''
            SELECT
                e.id_cesta_cadastro_fk AS id_cesta,
                d.nome AS nome_doador,
                e.data_saida_estoque,
                e.quantidade_entregue
            FROM
                cestas_entregues e
            JOIN
                doadores d ON e.id_cesta_cadastro_fk = d.id_cesta
        ''')
        rows = cursor.fetchall()
        
        # Processar os dados para retornar em formato JSON
        processed_rows = [
            {
                "id_cesta": row[0],
                "nome_doador": row[1],
                "data_saida_estoque": row[2],
                "quantidade_entregue": row[3]
            }
            for row in rows
        ]
        
        close_connection(conn)
        
        # Retorna os dados das entregas como JSON
        return jsonify(processed_rows), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
