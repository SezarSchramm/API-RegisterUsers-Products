# Api de cadastro de perfil e produtos


### API RESTful com funcionalidades de cadastro de perfis únicos e criação de produtos ligados ao seu devido usuário.

### Funcionalidades: 

-   Fazer Login
-   Cadastrar um usuário
-   Detalhar Usuário
-   Editar Perfil do Usuário
-   Listar produtos
-   Detalhar produtos
-   Cadastrar produtos
-   Editar produtos
-   Remover produtos


# Instalação:

1. Clonar repositório.
2. Execute o comando 'npm install' para instalar as dependências.
3. Execute no Beekeeper, os comandos do arquivo 'dados.sql' para criar um banco de dados PostgreSQL.
4. Execute o comando 'npm run dev' para iniciar o servidor. 

# Endpoints

## `/usuarios`

Essa é a rota é utilizada para cadastrar um novo usuario no sistema.

### Método HTTP: POST

-   Parâmetros obrigatórios:
    -   nome -- Nome do usuário
    -   email -- Email do usuário
    -   senha -- Senha da conta
    -   nome_loja -- Nome para loja do usuário

Exemplo do body a ser enviado:

```
{
    "nome": "Pedro",
    "email": "pedro@email.com",
    "senha": "123456",
    "nome_loja": "Loja do Pedro"
}
```

## `/login`

Rota que permite o usuario cadastrado realizar o login no sistema.

### Método HTTP: POST

-   Parâmetros obrigatórios:
     - email -- Email cadastrado
     - senha -- Senha do usuário

Exemplo do body a ser enviado:

```
{
    "email": "pedro@email.com",
    "senha": "123456"
}
```

Exemplo de resposta da API:

```
{
    "usuario": {
        "id": 1,
        "nome": "Pedro",
        "email": "pedro@email.com",
        "nome_loja": "Loja do Pedro"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

## ATENÇÃO: Todas as rotas abaixo, são rotas protegidas, deverão exigir o token do usuário logado. Portanto, para cada implementação será necessário validar o token informado.

## `/perfil`

Rota usada quando o usuario quiser obter os dados do seu próprio perfil

### Método HTTP: GET

Exemplo de resposta da API:

```
{ 
    "id": 1,
    "nome": "Pedro",
    "email": "pedro@email.com",
    "nome_loja": "Loja do Pedro"
}
```

## `/perfil`

Rota usada para quando o usuário quiser salvar alterações no seu próprio perfil.

### Método HTTP: PUT

**Lembrando que todos os parâmetros não são obrigatorios, ou seja, pode-se alterar cada um por si só.**

Exemplo do body a ser enviado:

```
{
    "nome": "Pedro Santos",
    "email": "pedro_santos@email.com",
    "senha": "123456789",
    "nome_loja": "Loja do Pedro"
}
```

## `/produtos`

Rota utilizada para quando o usuario logado quiser listar todos os seus produtos cadastrados.

### Método HTTP: GET

Exemplo de resposta da API:

```
[
    {
        "id": 1,
        "usuario_id": 1,
        "nome": "Camisa preta",
        "estoque": 12,
        "categoria": "Camisa",
        "preco": 4990,
        "descricao": "Camisa de malha com acabamento fino.",
        "imagem": "https://bit.ly/3ctikxq"
    },
    {
        "id": 2,
        "usuario_id": 1,
        "nome": "Camisa azul",
        "estoque": 8,
        "categoria": "Camisa",
        "preco": 4490,
        "descricao": "Camisa de malha com acabamento fino.",
        "imagem": "https://bit.ly/3ctikxq"
    }
]
```

## `/produtos/:id`

Rota utilizada quando o usuario logado quiser obter um dos seus produtos cadastrados

### Método HTTP: GET

Exemplo de resposta da API

```
{
    "id": 2,
    "usuario_id": 1,
    "nome": "Camisa azul",
    "estoque": 8,
    "categoria": "Camisa",
    "preco": 4490,
    "descricao": "Camisa de malha com acabamento fino.",
    "imagem": "https://bit.ly/3ctikxq"
}
```

## `/produtos`

Rota utilizada quando o usuario quiser cadastrar um produto atrelado ao seu próprio cadastro

### Método HTTP: POST

Exemplo do body a ser enviado:

```
{
    "nome": "Camisa amarela",
    "estoque": 20,
    "categoria": "Camisa",
    "preco": 5490,
    "descricao": "Camisa de malha com acabamento fino.",
    "imagem": "https://bit.ly/3ctikxq"
}
```

## `/produtos/:id`

Rota chamada quando o usuario logado quiser atualizar um dos seus produtos cadastrados

### Método HTTP: PUT

-   Parâmetros obrigatórios:
     - nome -- Nome do produto
     - estoque -- Quantidade do produto no estoque
     - preco -- Valor do produto
     - descricao -- Descrição do produto

```
{
    "nome": "Camisa amarela",
    "estoque": 20,
    "categoria": "Camisa",
    "preco": 5490,
    "descricao": "Camisa de malha com acabamento fino.",
    "imagem": "https://bit.ly/3ctikxq"
}
```

## `/produtos/:id`

Rota Chamada quando o usuario logado quiser excluir um dos seus produtos cadastrados

### Método HTTP: DELETE


