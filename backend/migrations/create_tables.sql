CREATE TABLE IF NOT EXISTS doadores (
    id_cesta INTEGER PRIMARY KEY AUTOINCREMENT,  
    nome TEXT NOT NULL,                          
    cpf TEXT UNIQUE,                             
    cnpj TEXT UNIQUE,                           
    endereco TEXT,                               
    data_doacao DATE NOT NULL,                   
    data_proximo_vencimento DATE,                
    quantidade_cesta INTEGER NOT NULL            
);

CREATE TABLE IF NOT EXISTS cestas_entregues (
    id_entrega INTEGER PRIMARY KEY AUTOINCREMENT,  
    id_cesta_cadastro_fk INTEGER,                 
    data_saida_estoque DATE NOT NULL,              
    quantidade_entregue INTEGER NOT NULL,           
    FOREIGN KEY (id_cesta_cadastro_fk) REFERENCES doadores(id_cesta)
);

CREATE TABLE IF NOT EXISTS estoque (
    id_estoque INTEGER PRIMARY KEY AUTOINCREMENT,   
    id_cesta_cadastro_fk INTEGER,                  
    quantidade_disponivel INTEGER NOT NULL,        
    data_proximo_vencimento DATE,                  
    nome TEXT,                                      
    FOREIGN KEY (id_cesta_cadastro_fk) REFERENCES doadores(id_cesta) 
);

CREATE TABLE IF NOT EXISTS doacao (
    id_doacao INTEGER PRIMARY KEY AUTOINCREMENT,    
    id_doador INTEGER NOT NULL,                    
    quantidade_cesta INTEGER NOT NULL,              
    FOREIGN KEY (id_doador) REFERENCES doadores(id_cesta) 
);
