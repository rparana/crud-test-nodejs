# MedPrev Back-end Challenge - Create an API

The general purpose is receiving a list of websites and organize this information to classify and store all the details of the website.

### Project

This was made using Node and Koa

### Setup

Install the depencies

```sh
$ npm install
or
$ yarn install
```

To start the server

```sh
$ npm run dev
or
$ yarn dev
```

To run the tests

```sh
$ npm test
or
$ yarn test
```

### Objetivos

- Desenvolvimento de uma API (CRUD de pessoa) no padrão REST;
- Protótipo completamente funcional;
- Tentar utilizar a maior parte das tecnologias;
- Ter uma rota para listar os cadastros com paginação (GET);
- Ter uma rota para cadastro/edição dos cadastros (POST/PUT);
- Ter uma rota para excluir um cadastro pelo ID (DELETE);
- No cadastro de endereço, poder cadastrar mais de um;
- Aplicar validação dos campos obrigatórios;
- Aplicar testes automatizados com Jest;
- Utilizar ESLint com a configuração AIRBNB;
- Entregar código fonte em um repositório público (GitHub, Bitbucket, etc...)

### Campos (* são obrigatórios)

- \* Tipo: Pessoa física / Pessoa jurídica
- \* Nome
- \* Razão social (quando PJ)
- \* CPF (quando PF)
- \* CNPJ (quando PJ)
- \* Sexo (quando PF)
- \* Data de nascimento (quando PF)
- Email
- Telefone
- Celular
- Foto (apenas URL)
- Endereço (array de itens)
  - \* Endereço
  - \* Número
  - Complemento
  - Bairro
  - \* Cidade
  - Estado
  - CEP

### API endpoints:

GET:    /person/ -> list all active register in the database. 
GET:    /person/[id]/ -> list one register.
POST:   /person/ -> create new register.
POST:  /person/[id]/ -> modify register
DELETE: /person/[id]/ -> remove register
### Using Pagination

The GET /person/ route permits using pagination, to use it pass the page as a query parameter like:

```
http://localhost:3000/person?page=2
```
## POST  JSON Example

```json
{
	"tipo": "Pessoa física",
	"nome": "Nome Pessoa",
	"CPF": "000.000.00-00",
	"sexo": "Masculino",
	"dataNascimento": "01/01/0001",
	"email": "mail@mail.com",
	"telefone": "(41) 9999-9999",
	"celular": "(41) 99999-9999",
	"foto": "http://www.myphoto.com",
	"endereco": [
		{
			"endereco": "Rua Minha Rua",
			"numero": "100",
			"complemento": "",
			"bairro": "Bairro",
			"cidade": "Cidade",
			"estado": "Estado",
			"cep": "00000-000"
		}
	]
}
## What you would add/change if you had more time?

- Improve readbility
- More tests
