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
--Toda entrada de dados vai para tabela doadores que acontece através da página de cadastre.html
-- Tabela de cestas entregues
CREATE TABLE IF NOT EXISTS cestas_entregues (
    id_entrega INTEGER PRIMARY KEY AUTOINCREMENT,   -- Cada entrega terá um id único
    id_cesta_cadastro_fk INTEGER,                   -- Referência ao id_cesta do doador
    data_saida_estoque DATE NOT NULL,               -- Data de saída do estoque
    quantidade_entregue INTEGER NOT NULL,           -- Quantidade de cestas entregues
    FOREIGN KEY (id_cesta_cadastro_fk) REFERENCES doadores(id_cesta) -- Chave estrangeira para doadores
);
-- Quando o usuário executar a função de doar, logo a tabela cestas entregues, recebera da tabela estoque, o id_cesta_cadastro_fk, e tudo que tiver dentro da tabela cestas_entregues é porque são cesta que literalmente foram entregues. Sairam do estoque pelo motivo de entrega.
-- Registra as cestas disponíveis no estoque
CREATE TABLE IF NOT EXISTS estoque (
    id_estoque INTEGER PRIMARY KEY AUTOINCREMENT,   -- Cada registro de estoque terá um id único
    id_cesta_cadastro_fk INTEGER,                   -- Referência ao id_cesta do doador
    quantidade_disponivel INTEGER NOT NULL,         -- Quantidade de cestas disponíveis no estoque
    data_proximo_vencimento DATE,                   -- Data de validade das cestas
    nome TEXT,                                      -- Nome do doador
    FOREIGN KEY (id_cesta_cadastro_fk) REFERENCES doadores(id_cesta) -- Chave estrangeira para doadores
);
-- É a tabela estoque que recebe a as ações do usuários que vão executar funções. As outras tabelas, como cestas_entregues e doacao vão apenas observar as mudanças e atualizar os dados atraves das chaves estrangeiras conectadas a tabela estoque.
-- Na estoque.html, há as opções de: doar (registrar saida de cestas por doação); saída por quebra/má qualidade; saída por data de validade.
-- Quando executar a função doar_cesta(), o sistema capturará automaticamente a data atual como a data de saída da cesta do estoque. Essa data será armazenada na tabela de cestas_entregues na coluna de data_saida_estoque.

-- Tabela de doações
-- Registra cada doação feita por um doador
CREATE TABLE IF NOT EXISTS doacao (
    id_doacao INTEGER PRIMARY KEY AUTOINCREMENT,    -- Cada registro de doação terá um id único
    id_doador INTEGER NOT NULL,                     -- Referência ao id_cesta do doador
    quantidade_cesta INTEGER NOT NULL,              -- Quantidade de cestas doadas
    FOREIGN KEY (id_doador) REFERENCES doadores(id_cesta) -- Chave estrangeira para doadores
);
-- Inserir dados na tabela doacao após consulta ao estoque: Sempre que uma doação for registrada atráves da tabela estoque, o sistema deve consultar a tabela estoque para capturar as informações mais atualizadas e atualizar a tabela doador.

-- Na tabela de doadores, o documento pode ser CPF ou CNPJ, sendo que ambos são únicos e referenciáveis.
-- Se um doador inserir um nome e o sistema detectar que já existe um cpf ou cnpj cadastrado, o sistema deve capturar da tabela doadores e mostrar o nome e endereço para que o usuário da Associação agora precise informar apenas a data da nova doação, validade e quantidade.

-- Além disso, se o doador, cpf ou cnpj, já tiver cestas no estoque (associadas ao id_cesta), ao fazer uma nova doação, um novo id_cesta será gerado para a nova quantidade de cestas doadas. Ou seja, o mesmo doador pode ter múltiplos id_cesta associados ao seu cpf ou cnpj.

-- Se forem doadas 5 cestas por um doador, todas as 5 cestas compartilharão o mesmo id_cesta gerado automaticamente. Se 3 dessas 5 cestas forem entregues, o id_cesta (por exemplo, 1713) ainda ficará ativo no estoque, pois ainda restam 2 cestas associadas a esse id_cesta.

-- Se houver um registro na tabela `cestas_entregues`, significa que as cestas já foram retiradas do estoque e entregues.