# FanCar 🚗

Loja online de veículos com **catálogo público** e **área administrativa autenticada** para cadastrar, editar e remover carros.

![Catálogo do FanCar](docs/catalogo.png)
![Área administrativa](docs/admin.png)

## Funcionalidades

- Catálogo de veículos com página de detalhes e ordenação por preço
- Login com **JWT** (access + refresh token)
- Área admin protegida por guard, com tabela de veículos e formulário de cadastro/edição
- Upload de foto do veículo, servida pela própria API
- Página de contato e página 404

## Stack

| Camada | Tecnologia |
|---|---|
| Front-end | Angular 16 (módulos com lazy loading) |
| Back-end | Django 4.2, Django REST Framework, SimpleJWT, python-decouple |
| Banco | PostgreSQL 14 (via Docker) |

## Arquitetura

```
FanCar/
├── backend/
│   ├── backend/       settings, rotas e configuração do JWT
│   └── carros/        model, serializer e viewset de Carros
├── frontend/src/app/
│   ├── auth/          serviço, guard e interceptor de autenticação
│   ├── catalogo/      listagem e detalhes dos veículos
│   ├── admin/         tabela e formulário de cadastro
│   └── services/      comunicação com a API
└── docker-compose.yaml
```

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/token/` | Gera access e refresh token |
| POST | `/api/token/refresh/` | Renova o access token |
| GET | `/api/carros/?ordering=valor` | Lista veículos (ordenável por valor) |
| POST/PUT/PATCH/DELETE | `/api/carros/{id}/` | Cadastra, edita e remove veículos |

## Como rodar

**Pré-requisitos:** Python 3.10+, Node 18+, Docker.

```bash
docker compose up -d

cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Em outro terminal:

```bash
cd frontend
npm install
npm start
```

Acesse `http://localhost:4200` e entre em **Admin** com o usuário criado no `createsuperuser`.

## Testes

```bash
cd backend && python manage.py test
cd frontend && npm test
```

## Autora

Feito por [Naiara Rodrigues](https://github.com/naiarar).
