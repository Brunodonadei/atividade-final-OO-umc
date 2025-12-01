# Atividade Final OO - Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)

Backend desenvolvido em **Node.js** utilizando **arquitetura orientada a objetos** para gerenciamento de produtos e reservas.

Bruno Donadei Manfredini 11222101488
Gustavo Soares Ferreira 11222101537

---

## Funcionalidades

- **CRUD de Produtos**: criar, listar, atualizar, deletar
- **Controle de Estoque**: definir, adicionar ou remover unidades
- **Reservas de Produtos**: reservar múltiplas unidades, validação de estoque
- **Filtros**: listar produtos por `code` e `name`
- **Documentação Swagger**: API totalmente documentada
- **Seed inicial**: popula o banco com produtos de exemplo

---

## Tecnologias Utilizadas

- Node.js & Express
- SQLite3
- UUID para IDs únicos
- Swagger para documentação da API

---

## Estrutura do Projeto

```text
src/
├── controllers/ # Controllers da aplicação
├── models/ # Models de domínio
├── repositories/ # Repositórios de dados (acesso ao DB)
├── routes/ # Rotas do Express
├── services/ # Regras de negócio
├── utils/ # Utils (Database, Seed, etc)
├── seed/ # Seed inicial de produtos
└── server.js # Arquivo principal
```


---

## Instalação e Execução

1. Clone o repositório:

```
git clone https://github.com/Brunodonadei/atividade-final-OO-umc.git
cd atividade-final-OO-umc
```

2. Instale dependências:

```
npm install
```

3. Execute o servidor:

```
npm start
```
Servidor rodando em: http://localhost:3000


## Documentação da API

A documentação completa está disponível via Swagger em:
```
http://localhost:3000/api-docs
```

## Rotas da API

### Produtos

| Método | Rota                      | Descrição                                             |
| ------ | ------------------------- | ----------------------------------------------------- |
| GET    | `/produtos`               | Lista todos os produtos (com filtros `code` e `name`) |
| POST   | `/produtos`               | Cria um novo produto                                  |
| GET    | `/produtos/:id`           | Obtém produto por ID                                  |
| PUT    | `/produtos/:id`           | Atualiza um produto                                   |
| DELETE | `/produtos/:id`           | Remove um produto                                     |
| PATCH  | `/produtos/:id/stock`     | Define o stock de um produto                          |
| PATCH  | `/produtos/:id/stock/add` | Incrementa ou decrementa o stock                      |

Exemplo de payload (criar produto):
```json
{
  "code": "#P101",
  "name": "Camisa Social",
  "price": 49.9,
  "stock": 10,
  "imageUrl": ""
}
```

### Reservas

| Método | Rota            | Descrição               |
| ------ | --------------- | ----------------------- |
| GET    | `/reservas`     | Lista todas as reservas |
| POST   | `/reservas`     | Cria uma nova reserva   |
| DELETE | `/reservas/:id` | Remove uma reserva      |

Exemplo de payload (criar reserva):
```json
{
  "product_code": "#P101",
  "customer_name": "João",
  "customer_number": "11999999999",
  "quantity": 2
}
```


### Regras importantes:
- A reserva não pode exceder o estoque disponível
- Ao criar uma reserva, o estoque do produto é decrementado automaticamente
- Ao remover uma reserva, o estoque do produto é incrementado de volta

## Estrutura de Dados

### Produto

```json
{
  "id": "uuid",
  "code": "#P101",
  "name": "Camisa Social",
  "price": 49.9,
  "stock": 10,
  "imageUrl": "",
  "created_at": "2025-12-01T18:49:18.450Z"
}
```


### Reserva
```json
{
  "id": "uuid",
  "product_code": "#P101",
  "customer_name": "João",
  "customer_number": "11999999999",
  "quantity": 2,
  "created_at": "2025-12-01T19:00:00.000Z"
}
```

## Testes
Para testar a API, você pode usar Postman ou qualquer cliente HTTP. Todos os endpoints estão documentados via Swagger.

## Licença
Projeto open-source.
