-- Tabela de doadores (id_cesta refere-se ao registro de doações de cestas)
CREATE TABLE IF NOT EXISTS doadores (
    id_cesta INTEGER PRIMARY KEY AUTOINCREMENT,  -- Cada doação de cestas terá um id único
    nome TEXT NOT NULL,                          -- Nome do doador
    cpf TEXT UNIQUE,                             -- CPF único do doador
    cnpj TEXT UNIQUE,                            -- CNPJ único do doador (pode ser alternado com CPF)
    endereco TEXT,                               -- Endereço do doador
    data_doacao DATE NOT NULL,                   -- Data da doação das cestas
    data_proximo_vencimento DATE,                -- Data de vencimento das cestas doadas
    quantidade_cesta INTEGER NOT NULL            -- Quantidade de cestas doadas
);
-- Tabela de cestas entregues
-- Registra a saída das cestas do estoque para entrega
CREATE TABLE IF NOT EXISTS cestas_entregues (
    id_entrega INTEGER PRIMARY KEY AUTOINCREMENT,   -- Cada entrega terá um id único
    id_cesta_cadastro_fk INTEGER,                   -- Referência ao id_cesta do doador
    data_saida_estoque DATE NOT NULL,               -- Data de saída do estoque
    quantidade_entregue INTEGER NOT NULL,           -- Quantidade de cestas entregues
    FOREIGN KEY (id_cesta_cadastro_fk) REFERENCES doadores(id_cesta) -- Chave estrangeira para doadores
);
-- Registra as cestas disponíveis no estoque
CREATE TABLE IF NOT EXISTS estoque (
    id_estoque INTEGER PRIMARY KEY AUTOINCREMENT,   -- Cada registro de estoque terá um id único
    id_cesta_cadastro_fk INTEGER,                   -- Referência ao id_cesta do doador
    quantidade_disponivel INTEGER NOT NULL,         -- Quantidade de cestas disponíveis no estoque
    data_proximo_vencimento DATE,                   -- Data de validade das cestas
    nome TEXT,                                      -- Nome do doador
    FOREIGN KEY (id_cesta_cadastro_fk) REFERENCES doadores(id_cesta) -- Chave estrangeira para doadores
);
-- Tabela de doações
-- Registra cada doação feita por um doador
CREATE TABLE IF NOT EXISTS doacao (
    id_doacao INTEGER PRIMARY KEY AUTOINCREMENT,    -- Cada registro de doação terá um id único
    id_doador INTEGER NOT NULL,                     -- Referência ao id_cesta do doador
    quantidade_cesta INTEGER NOT NULL,              -- Quantidade de cestas doadas
    FOREIGN KEY (id_doador) REFERENCES doadores(id_cesta) -- Chave estrangeira para doadores
);
-- Na tabela de doadores, o documento pode ser CPF ou CNPJ, sendo que ambos são únicos e referenciáveis.
-- Se um doador já estiver cadastrado, o sistema deve verificar se o CPF ou CNPJ já existe no banco de dados para evitar duplicidade.
-- Além disso, se o doador já tiver cestas no estoque (associadas ao id_cesta), ao fazer uma nova doação, um novo id_cesta será gerado para a nova quantidade de cestas doadas. Ou seja, o mesmo doador pode ter múltiplos id_cesta associados ao seu documento.
-- Na tela de gerenciamento do estoque, haverá as opções de: doar (registrar entrada de cestas); saída por quebra; saída por data de validade.
-- Quando o usuário realizar a ação de "doar", o sistema capturará automaticamente a data atual como a data de entrada no estoque.
-- Se forem doadas 5 cestas para um doador, todas compartilharão o mesmo id_cesta gerado automaticamente. Se 3 dessas 5 cestas forem entregues, o id_cesta (por exemplo, 1713) ainda ficará ativo no estoque, pois ainda restam 2 cestas associadas a esse id_cesta.
-- Se houver um registro na tabela `cestas_entregues`, significa que as cestas já foram retiradas do estoque e entregues.