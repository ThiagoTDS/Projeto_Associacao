<img src="frontend/img/ASSOCIAÇÃO BENEFICENTE.png">

# Trabalho de extensão

## Descrição
Este projeto foi desenvolvido como parte de um trabalho de extensão universitária do curso Análise e desenvolvimento de sistemas e ciência da computação da Universidade Estácio de Sá, com o objetivo de praticar os conhecimentos das matérias de Desenvolvimento rápido em Python e Banco de dados. O projeto foi realizado em grupo e faz parte da avaliação final das disciplinas.

## Funcionalidades

- Cadastrar novos doadores
- Selecionar cestas para fazer doação ou para retirar do estoque por motivos como validade ou baixa qualidade.
- Analisar quantidade de cestas no estoque, ordenadas pela data mais próxima ao vencimento.

## Contribuição

Contribuições são bem-vindas! Se você deseja colaborar com o projeto, siga os passos abaixo:

1. **Faça um fork do repositório**: Crie uma cópia do projeto em sua conta do GitHub clicando no botão "Fork" no topo da página do repositório.

2. **Clone o repositório forkado**: Depois de fazer o fork, clone o repositório para sua máquina local:
    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    ```

3. **Crie uma branch para sua feature**: Antes de fazer alterações, crie uma nova branch para sua contribuição:
    ```bash
    git checkout -b nome-da-sua-branch
    ```

4. **Faça as alterações desejadas**: Edite o código, adicione novas funcionalidades ou corrija bugs.

5. **Faça commit das suas alterações**: Após terminar suas modificações, faça o commit:
    ```bash
    git commit -m "Descrição clara do que foi alterado"
    ```

6. **Envie as alterações para o repositório forkado**:
    ```bash
    git push origin nome-da-sua-branch
    ```

7. **Abra um Pull Request**: Acesse o repositório original e clique em "New Pull Request" para enviar suas alterações para revisão.

---

## Como executar

1. No terminal, execute: ```npm install```
2. No terminal do python, vá até o diretorio backend/ e execute: ``python api.py``
3. Através do live-server, acesse o index.html e o site deve estar funcionando.

Antes de contribuir, por favor, certifique-se de que suas alterações seguem o padrão de código e as boas práticas estabelecidas no projeto. Também é importante garantir que novos recursos estejam bem documentados e testados.


## Fluxo de operação

### Cadastro de Doador (via cadastre.html):
- O doador insere seus dados e a quantidade de cestas doadas.
- O sistema verifica se o CPF ou CNPJ já existe. Caso sim, exibe os dados do doador para evitar duplicidade.
- Se o doador já existe e tem cestas associadas, um novo id_cesta é gerado para a nova doação.

### Registro no Estoque:

- O sistema armazena as cestas doadas na tabela estoque com um novo id_cesta.
- O estoque é atualizado com a quantidade disponível e a data de validade das cestas.

### Doação e Saída de Cestas:

- Ao realizar uma doação (por exemplo, 5 cestas), o mesmo id_cesta é utilizado para todas.
- Se uma entrega parcial for realizada (3 cestas), o sistema ainda mantém o id_cesta ativo, com 2 cestas restantes no estoque.

### Registro de Entregas:

- Quando cestas são entregues, a tabela cestas_entregues é atualizada, removendo-as do estoque.
- Se uma entrega é registrada na tabela cestas_entregues, significa que as cestas já saíram do estoque.

## Stack
### Front-end
1. HTML
2. SCSS
3. JavaScript
4. React JS
5. Vite

### Back-end
1. Python
2. Flask
3. Node.js
4. Axios

## Protótipo
Figma: <a href="https://www.figma.com/design/E4fkoZzegtX9x6UMSaZ8xR/Associa%C3%A7%C3%A3o-Beneficente?t=yOg6tWdkTZIMSLc3-1">veja o projeto clicando aqui!</a>

## Metodologia de desenvolvimento
RAD
