import sqlite3;
import tkinter as tk;
from tkinter import messagebox;


# Conectar ao banco de dados (será criado se não existir)
conn = sqlite3.connect('cestas_basicas.db')

# Criar um cursor
cursor = conn.cursor()

# Criar a tabela de pessoas se não existir
cursor.execute('''
    CREATE TABLE IF NOT EXISTS pessoas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        telefone TEXT,
        endereco TEXT,
        email TEXT,
        quantidade_cestas INTEGER DEFAULT 0
    )
''')

# Confirmar as alterações no banco de dados
conn.commit()

def cadastrar_pessoa(nome, telefone, endereco, email):
    cursor.execute('''
        INSERT INTO pessoas (nome, telefone, endereco, email) VALUES (?, ?, ?, ?)
    ''', (nome, telefone, endereco, email))
    conn.commit()
    print(f'{nome} foi cadastrado(a) com sucesso!')

#Função para listar Pessoas
def listar_pessoas():
    cursor.execute('SELECT * FROM pessoas')
    pessoas = cursor.fetchall()

    if pessoas:
        for pessoa in pessoas:
            print(f'ID: {pessoa[0]}, Nome: {pessoa[1]}, Telefone: {pessoa[2]}, Endereço: {pessoa[3]}, E-mail: {pessoa[4]}, Cestas Recebidas: {pessoa[5]}')
    else:
        print('Nenhuma pessoa cadastrada.')

#Função para atualizar numero de cestas basicas recebidas 
def atualizar_cestas(id_pessoa, quantidade):
    cursor.execute('''
        UPDATE pessoas SET quantidade_cestas = quantidade_cestas + ? WHERE id = ?
    ''', (quantidade, id_pessoa))
    conn.commit()
    print(f'Cestas atualizadas para a pessoa com ID {id_pessoa}.')

#Função para deletar uma pessoa
def deletar_pessoa(id_pessoa):
    cursor.execute('DELETE FROM pessoas WHERE id = ?', (id_pessoa,))
    conn.commit()
    print(f'Pessoa com ID {id_pessoa} foi deletada.')

# Criar a janela principal
root = tk.Tk()
root.title("Cadastro de Cestas Básicas")
root.geometry("800x800")

def cadastrar_pessoa_gui():
    nome = entry_nome.get()
    telefone = entry_telefone.get()
    endereco = entry_endereco.get()
    email = entry_email.get()

    if nome:
        cadastrar_pessoa(nome, telefone, endereco, email)
        messagebox.showinfo("Sucesso", f'{nome} foi cadastrado(a) com sucesso!')
        listar_pessoas_gui()
        entry_nome.delete(0, tk.END)
        entry_telefone.delete(0, tk.END)
        entry_endereco.delete(0, tk.END)
        entry_email.delete(0, tk.END)
    else:
        messagebox.showwarning("Atenção", "Por favor, insira o nome.")

def listar_pessoas_gui():
    listbox.delete(0, tk.END)
    cursor.execute('SELECT * FROM pessoas')
    pessoas = cursor.fetchall()

    for pessoa in pessoas:
        listbox.insert(tk.END, f'ID: {pessoa[0]}, Nome: {pessoa[1]}, Telefone: {pessoa[2]}, Endereço: {pessoa[3]}, E-mail: {pessoa[4]}, Cestas: {pessoa[5]}')

def atualizar_cestas_gui():
    try:
        id_pessoa = int(entry_id.get())
        quantidade = int(entry_cestas.get())

        if quantidade > 0:
            atualizar_cestas(id_pessoa, quantidade)
            messagebox.showinfo("Sucesso", "Cestas atualizadas com sucesso!")
            listar_pessoas_gui()
        else:
            messagebox.showwarning("Erro", "Quantidade deve ser positiva.")
    except ValueError:
        messagebox.showwarning("Erro", "Por favor, insira valores válidos.")

def deletar_pessoa_gui():
    try:
        id_pessoa = int(entry_id.get())
        deletar_pessoa(id_pessoa)
        messagebox.showinfo("Sucesso", "Pessoa deletada com sucesso!")
        listar_pessoas_gui()
    except ValueError:
        messagebox.showwarning("Erro", "Por favor, insira um ID válido.")

# Campos de Entrada
label_nome = tk.Label(root, text="Nome:")
label_nome.pack(pady=5)
entry_nome = tk.Entry(root)
entry_nome.pack(pady=5)

label_telefone = tk.Label(root, text="Telefone:")
label_telefone.pack(pady=5)
entry_telefone = tk.Entry(root)
entry_telefone.pack(pady=5)

label_endereco = tk.Label(root, text="Endereço:")
label_endereco.pack(pady=5)
entry_endereco = tk.Entry(root)
entry_endereco.pack(pady=5)

label_email = tk.Label(root, text="E-mail:")
label_email.pack(pady=5)
entry_email = tk.Entry(root)
entry_email.pack(pady=5)

label_id = tk.Label(root, text="ID (para atualizar/deletar):")
label_id.pack(pady=5)
entry_id = tk.Entry(root)
entry_id.pack(pady=5)

label_cestas = tk.Label(root, text="Cestas a adicionar:")
label_cestas.pack(pady=5)
entry_cestas = tk.Entry(root)
entry_cestas.pack(pady=5)

# Botões
button_cadastrar = tk.Button(root, text="Cadastrar Pessoa", command=cadastrar_pessoa_gui)
button_cadastrar.pack(pady=5)

button_atualizar = tk.Button(root, text="Atualizar Cestas", command=atualizar_cestas_gui)
button_atualizar.pack(pady=5)

button_deletar = tk.Button(root, text="Deletar Pessoa", command=deletar_pessoa_gui)
button_deletar.pack(pady=5)

# Lista de Pessoas
listbox = tk.Listbox(root, width=80)
listbox.pack(pady=10)

listar_pessoas_gui()
root.mainloop()
conn.close()
