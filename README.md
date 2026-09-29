# FanCar 🚗

[![CI](https://github.com/naiarar/FanCar/actions/workflows/ci.yml/badge.svg)](https://github.com/naiarar/FanCar/actions/workflows/ci.yml)

Loja online de veículos com **catálogo público** e **área administrativa autenticada** para cadastrar, editar e remover carros.

| Catálogo | Área administrativa |
|---|---|
| ![Catálogo do FanCar](docs/catalogo.webp) | ![Área administrativa](docs/admin.webp) |

## Funcionalidades

- Catálogo com busca por nome, marca ou modelo, ordenação por preço e página de detalhes
- Login com **JWT** (access + refresh token, com renovação automática do access token)
- Área admin protegida por guard, com tabela de veículos e formulário de cadastro/edição validado
- Upload de foto do veículo, servida pela própria API (a foto antiga é apagada ao trocar ou excluir o carro)
- Leitura pública da API e escrita restrita a usuários autenticados
- Layout responsivo, página de contato e página 404

## Stack

| Camada | Tecnologia |
|---|---|
| Front-end | Angular 21 (componentes standalone, signals, zoneless, lazy loading), Bootstrap 5, Vitest |
| Back-end | Python 3.10+, Django 5.2 LTS, Django REST Framework, SimpleJWT, python-decouple |
| Banco | PostgreSQL 16 (via Docker) |
| CI | GitHub Actions (testes do back-end e do front-end e build) |

## Arquitetura

```
FanCar/
├── backend/
│   ├── backend/          settings, rotas e configuração do JWT
│   └── carros/           model, serializer, viewset, testes e comando de seed
├── frontend/src/app/
│   ├── auth/             serviço, guard e interceptor de autenticação
│   ├── catalogo/         listagem e detalhes dos veículos
│   ├── admin/            tabela e formulário de cadastro
│   ├── services/         comunicação com a API
│   └── models/           tipos compartilhados
├── docs/                 capturas de tela
└── docker-compose.yaml   PostgreSQL
```

## Endpoints

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| POST | `/api/token/` | — | Gera access e refresh token |
| POST | `/api/token/refresh/` | — | Renova o access token |
| GET | `/api/carros/?ordering=-valor&search=jeep` | — | Lista veículos (ordenável por `valor`, `ano_modelo` e `quilometragem`; busca por nome, marca e modelo) |
| GET | `/api/carros/{id}/` | — | Detalha um veículo |
| POST | `/api/carros/` | JWT | Cadastra um veículo (`multipart/form-data` para enviar a foto) |
| PUT/PATCH/DELETE | `/api/carros/{id}/` | JWT | Edita ou remove um veículo |

## Como rodar

**Pré-requisitos:** Python 3.10+, Node 20.19+ (ou 22.12+/24+), Docker.

### 1. Banco de dados e API

```bash
cd backend
cp .env.example .env
docker compose --env-file .env -f ../docker-compose.yaml up -d --wait

python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py popular_carros  # cadastra 3 veículos de exemplo
python manage.py createsuperuser
python manage.py runserver
```

A API fica em `http://localhost:8000/api/` e o Django Admin em `http://localhost:8000/admin/`.

> Se a porta 5432 já estiver em uso por outro PostgreSQL, troque `DB_PORT` no `.env` (por exemplo, `5440`) antes de subir o container.

### 2. Front-end

Em outro terminal:

```bash
cd frontend
npm ci
npm start
```

Acesse `http://localhost:4200` e entre em **Login** com o usuário criado no `createsuperuser`.

## Variáveis de ambiente (`backend/.env`)

| Variável | Padrão | Descrição |
|---|---|---|
| `SECRET_KEY` | — | Chave secreta do Django (obrigatória) |
| `DEBUG` | `False` | Modo debug (o `.env.example` já vem com `True` para desenvolvimento) |
| `ALLOWED_HOSTS` | `127.0.0.1,localhost` | Hosts aceitos, separados por vírgula |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:4200,http://127.0.0.1:4200` | Origens liberadas para o front-end |
| `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` | `carros`, `root`, `password`, `localhost`, `5432` | Conexão com o PostgreSQL (também usadas pelo `docker-compose.yaml`) |

## Testes

```bash
cd backend && python manage.py test   # requer o PostgreSQL rodando
cd frontend && npm test
```

## Autora

Feito por [Naiara Rodrigues](https://github.com/naiarar).
