<h1 align="center">
  <img alt="Habits Management" title="Habits Management" src="https://fv9-2.failiem.lv/thumb_show.php?i=ba9mca4ha&view" width="100px" />
</h1>

<h1 align="center">
  Habits Management - API
</h1>

<p align = "center">
Este é o backend da aplicação Habits Management - Uma database fake do Json-Server para cadastro onde usuários podem se cadastrar e gerenciar hábitos, grupos, metas e atividades. O objetivo dessa aplicação é praticar a criação de um backend fake através do Json-Server e Json-Server-Auth, utilizando o que foi ensinado nas aulas da sprint 5B (Q2).
</p>

<p align="center">
  <a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

## **Endpoints**

A API tem um total de 7 endpoints, sendo todos relacionados ao usuário - podendo cadastrar-se, cadastrar hábitos, grupos, registrar-se em grupos, criar metas e atividades para estes grupos.<br/>

O url base da API é https://habits-management.herokuapp.com

## Rotas que não precisam de autenticação

<h2 align ='center'> Listando usuários </h2>

Nessa aplicação o usuário sem fazer login ou se cadastrar pode ver os usuários já cadastrados na plataforma. Aqui conseguimos ver os usuários e suas informações básicas.
Na API podemos acessar a lista dessa forma:

`GET /users - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "email": "kenzinho@mail.com",
    "password": "$2a$10$YQiiz0ANVwIgpOjYXPxc0O9H2XeX3m8OoY1xk7OGgxTnOJnsZU7FO",
    "name": "Kenzinho",
    "age": 38,
    "id": 1
  },
  {
    "email": "bruno@teste.com",
    "password": "$2a$10$N1ykUKN/qvniGLyqoCf4ge7IM9yo9K82bTAN5.h7HpFbhkkvOtUe.",
    "name": "Bruno",
    "age": 33,
    "id": 2
  },
  {
    "email": "miguel@teste.com",
    "password": "$2a$10$8U3PesnU7KxKiTYjQCf/N.3f/Xaz23PBpj/KYCw3Ueoy3mRNXu4g2",
    "name": "Miguel",
    "age": 5,
    "id": 3
  }
]
```

<h2 align ='center'> Criação de usuário </h2>

`POST /register - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "marcos@teste.com",
  "password": "123456",
  "name": "Marcos",
  "age": 18
}
```

Caso dê tudo certo, a resposta será assim:

`POST /register - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmNvc0B0ZXN0ZS5jb20iLCJpYXQiOjE2NDIxMzg5OTcsImV4cCI6MTY0MjE0MjU5Nywic3ViIjoiNCJ9.3ZN-3egG6H6A8MfGyhKS1xDIOEHLMIyze_aWYq8aox4",
  "user": {
    "email": "marcos@teste.com",
    "name": "Marcos",
    "age": 18,
    "id": 4
  }
}
```

<h3 align ='center'> Possíveis erros no Cadastro </h3>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:
No exemplo a requisição foi feita faltando o campo "email" e/ou "password".

`POST /register - `
` FORMATO DA RESPOSTA - STATUS 400`

```json
"Email and password are required"
```

Email já cadastrado:

`POST /register - `
` FORMATO DA RESPOSTA - STATUS 400`

```json
"Email already exists"
```

A senha necessita de no mínimo 4 caracteres.

`POST /register - `
` FORMATO DA RESPOSTA - STATUS 400`

```json
"Password is too short"
```

<h2 align = "center"> Login </h2>

`POST /login - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "silva@teste.com",
  "password": "1234"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /login - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpbHZhQHRlc3RlLmNvbSIsImlhdCI6MTY0MjE4MTkyNywiZXhwIjoxNjQyMTg1NTI3LCJzdWIiOiI1In0.2RbjndDPCSQ9uitum28yh3JJDvtkPdcg9HYTIMIfJ1Q",
  "user": {
    "email": "silva@teste.com",
    "name": "Silva",
    "age": 18,
    "id": 5
  }
}
```

Com essa resposta, vemos que temos duas informações, o user e o token respectivo, dessa forma você pode guardar o token e o usuário logado no localStorage para fazer a gestão do usuário no seu frontend.

<h3 align ='center'> Possíveis erros no Login </h3>

Email / usuário não cadastrado/encontrado:

`POST /login - `
` FORMATO DA RESPOSTA - STATUS 400`

```json
"Cannot find user"
```

Senha incorreta:

`POST /login - `
` FORMATO DA RESPOSTA - STATUS 400`

```json
"Incorrect password"
```

## Rotas que necessitam de autorização

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}
> Após o usuário estar logado, ele deve conseguir visualizar os hábitos, grupos, metas e atividades.

<h2 align ='center'>Hábitos</h2>

<h3 align ='center'>Listar hábitos</h3>

`GET /habits - FORMATO DA RESPOSTA - STATUS 200`

```json
{
		"title": "Calistenia a tarde (15 minutos)",
		"category": "Saúde",
		"difficulty": "Muito difícil",
		"frequency": "Diária",
		"achieved": false,
		"how_much_achieved": 30,
		"userId": 1,
		"id": 1
	},
	{
		"title": "Futebol às terças-feiras",
		"category": "Saudê",
		"difficulty": "Muito fácil",
		"frequency": "Semanal",
		"achieved": false,
		"how_much_achieved": 30,
		"userId": 2,
		"id": 2
	}
```

<h3 align ='center'> Criar(registrar) hábitos</h3>

`POST /habits - FORMATO DA REQUISIÇÃO - STATUS 201`

```json
{
  "title": "Futebol às terças-feiras",
  "category": "Saúde",
  "difficulty": "Muito fácil",
  "frequency": "Semanal",
  "achieved": false,
  "how_much_achieved": 30,
  "userId": 2
}
```

1. O campo - "userId" deve receber respectivamente o id do user que possui o hábito:

```json
{
  "title": "Futebol às terças-feiras",
  "category": "Saúde",
  "difficulty": "Muito fácil",
  "frequency": "Semanal",
  "achieved": false,
  "how_much_achieved": 30,
  "userId": 2
}
"user": {
    "email": "marcos@teste.com",
    "name": "Marcos",
    "age": 18,
    "id": 4
  }
```

<h3 align ='center'> Atualizar hábito</h3>

`PATCH /habits/:id - FORMATO DA REQUISIÇÃO - STATUS 200`

1. A url da requisição deve receber o id do hábito que deseja atualizar;
2. O corpo da requisição deve receber somente os dados a serem atualizados.

```json
{
  "title": "Check-up",
  "category": "Saúde",
  "difficulty": "Fácil",
  "frequency": "Anual",
  "achieved": true
}
```

<h3 align ='center'> Deletar/Excluir hábito</h3>

`DELETE /habits/:id - FORMATO DA REQUISIÇÃO - STATUS 200`

1. A url da requisição deve receber o id do hábito que deseja excluir;
2. Não é necessário nenhuma informação no corpo da requisição.

```json
{}
```

<h2 align ='center'>Grupos</h2>

<h3 align ='center'> Listar Grupos </h3>

`GET /groups - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "name": "Grupo de leitura",
    "description": "Somos um grupo de leitura focado em auto ajuda.",
    "category": "Leitura",
    "users_on_group": [2],
    "userId": 2,
    "id": 1
  },
  {
    "name": "Grupo de calistenia",
    "description": "Somos um grupo focado calistenia.",
    "category": "Saúde",
    "users_on_group": [1, 2],
    "userId": 2,
    "id": 2
  }
]
```

<h3 align ='center'> Criar(Registrar) Grupos </h3>

`POST /groups - FORMATO DA REQUISIÇÃO - STATUS 201`

```json
{
  "name": "Grupo de calistenia",
  "description": "Somos um grupo focado calistenia.",
  "category": "Saúde",
  "users_on_group": [1, 2],
  "userId": 2
}
```

1. O campo - "users_on_group" deve receber os ids do users que participam do grupo.
2. O campo - "userId" deve receber respectivamente o id do user que criou o grupo.

<h3 align ='center'> Atualizar grupo</h3>

`PATCH /groups/:id - FORMATO DA REQUISIÇÃO - STATUS 200`

1. A url da requisição deve receber o id do grupo que deseja atualizar;
2. O corpo da requisição deve receber somente os dados a serem atualizados.

```json
{
  "name": "Grupo de malhação",
  "description": "Somos um grupo focado academia e fitness.",
  "category": "Saúde",
  "users_on_group": [1, 2]
}
```

<h3 align ='center'> Deletar/Excluir grupo</h3>

`DELETE /groups/:id - FORMATO DA REQUISIÇÃO - STATUS 200`

1. A url da requisição deve receber o id do grupo que deseja excluir;
2. Não é necessário nenhuma informação no corpo da requisição.

```json
{}
```

<h2 align ='center'>Metas</h2>

<h3 align ='center'> Listar metas </h3>

`GET /goals - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "title": "Nenhuma falta na academia cometida pelos membros do grupo na semana",
    "difficulty": "Díficil",
    "how_much_achieved": 100,
    "achieved": false,
    "groupsId": 1,
    "userId": 2,
    "id": 1
  },
  {
    "title": "Nenhuma falta nas atividades cometida pelos membros do grupo na semana",
    "difficulty": "Easy",
    "how_much_achieved": 100,
    "achieved": false,
    "groupId": 1,
    "userId": 2,
    "id": 2
  }
]
```

<h3 align ='center'> Criar(Registrar) Meta </h3>

`POST /goals - FORMATO DA REQUISIÇÃO - STATUS 201`

```json
{
  "title": "Nenhuma falta nas atividades cometida pelos membros do grupo na semana",
  "difficulty": "Easy",
  "how_much_achieved": 100,
  "achieved": false,
  "groupId": 1,
  "userId": 2
}
```

1. O campo - "userId" deve receber o id do user que criou a meta.
2. O campo - "groupId" deve receber o id do grupo ao qual a meta está relacionada.

<h3 align ='center'> Atualizar meta</h3>

`PATCH /goals/:id - FORMATO DA REQUISIÇÃO - STATUS 200`

1. A url da requisição deve receber o id da meta que deseja atualizar;
2. O corpo da requisição deve receber somente os dados a serem atualizados.

```json
{
  "difficulty": "Hard",
  "how_much_achieved": 30,
  "achieved": true
}
```

<h3 align ='center'> Deletar/Excluir meta</h3>

`DELETE /goals/:id - FORMATO DA REQUISIÇÃO - STATUS 200`

1. A url da requisição deve receber o id da meta que deseja excluir;
2. Não é necessário nenhuma informação no corpo da requisição.

```json
{}
```

<h2 align ='center'>Atividades</h2>

<h3 align ='center'> Listar atividades </h3>

`GET /activities - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "title": "Treino funcional na praia",
    "realization_time": "2021-03-10T15:00:00Z",
    "groupId": 2,
    "id": 1
  }
]
```

<h3 align ='center'> Criar(Registrar) Atividades </h3>

`POST /activities - FORMATO DA REQUISIÇÃO - STATUS 201`

```json
{
  "title": "Treino funcional na praia",
  "realization_time": "2021-03-10T15:00:00Z",
  "groupId": 2
}
```

1. O campo - "groupId" deve receber o id do grupo ao qual a atividades está relacionada.

<h3 align ='center'> Atualizar atividade</h3>

`PATCH /activities/:id - FORMATO DA REQUISIÇÃO - STATUS 200`

1. A url da requisição deve receber o id da atividade que deseja atualizar;
2. O corpo da requisição deve receber somente os dados a serem atualizados.

```json
{
  "title": "Treino funcional na academia",
  "realization_time": "2022-02-10T15:00:00Z"
}
```

<h3 align ='center'> Deletar/Excluir atividade</h3>

`DELETE /activities/:id - FORMATO DA REQUISIÇÃO - STATUS 200`

1. A url da requisição deve receber o id da atividade que deseja excluir;
2. Não é necessário nenhuma informação no corpo da requisição.

```json
{}
```

---

Produced by brunobgr
