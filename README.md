# FanCar
Um projeto de loja online para venda de veiculos

## Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:

Node.js v18.15.0 (https://nodejs.org)

Angular CLI (https://angular.io/cli)

Python 3.10.12 (https://www.python.org)

pip 22.0.2 (Gerenciador de pacotes Python)

Docker 24.0.7 (https://www.docker.com)

Rest Framework 3.14.0 (https://www.django-rest-framework.org/)

CORS (https://pypi.org/project/django-cors-headers/)

### Configuração do Backend (API REST)

Navegue até a pasta do backend:

```cd backend```

### Instale as dependências do Python:

```pip install -r requirements.txt```

Inicie o servidor da API REST:

```python app.py```


Certifique-se de que o servidor está sendo executado em http://localhost:5000/ ou atualize a URL de acordo com sua configuração.

### Configuração do Banco de Dados (Docker)
Certifique-se de que o Docker esteja instalado e em execução na sua máquina.

Navegue até a pasta do projeto onde está o arquivo docker-compose.yml.

Execute o seguinte comando para criar e iniciar o container do banco de dados:

`docker-compose up -d`

O banco de dados estará disponível na porta configurada no arquivo docker-compose.yml.

### Configuração do Frontend (Angular)
Navegue até a pasta do frontend:

`cd frontend`

Instale as dependências do projeto:

`npm install`

Inicie o servidor de desenvolvimento do Angular:

`ng serve`

O aplicativo será executado em http://localhost:4200/. Acesse essa URL em seu navegador para visualizar o projeto.<br>

## Uso do Projeto
Este projeto é ideal para lojas que comercializam veículos, permitindo cadastrar, descrever as principais características, editar e excluir veículos cadastrados.
Para cadastrar veículos, o usuário precisa estar logado, ir até a área 'Admin' localizada no canto superior direito da tela. Após acessar a área administrativa, os veículos já cadastrados serão exibidos em uma tabela, além de um botão para cadastrar um novo veículo. Ao pressionar esse botão, será aberta uma tela de cadastro onde o usuário deverá preencher todos os dados do veículo e fazer upload de uma foto antes de salvar. Para editar ou deletar um veículo, basta selecioná-lo na área administrativa e utilizar os botões localizados ao lado dos veículos.
Para ordenar por valor, há um botão tanto no 'Catálogo' quanto na tabela da área administrativa. Lembrando que o acesso à área administrativa requer autenticação do usuário.

## Estrutura do Projeto
As pastas "backend" e "frontend" estão na raiz do projeto.
Na pasta "backend", estão localizadas a subpasta "backend" com os arquivos de settings, urls principais e views onde estão as configurações do token JWT. E a pasta "carros" onde estão armazenadas as características do veículo.
Na pasta "frontend", está toda a parte visual do projeto, incluindo os arquivos .html, .css e .ts.

## Contribuição
Se quiser contribuir com este projeto, siga os passos abaixo:<br>
Faça um fork do repositório<br>
Crie uma branch com sua feature ou correção: `git checkout -b minha-feature`<br>
Faça o commit das suas alterações:` git commit -m 'Minha nova feature'`<br>
Envie para o repositório remoto: `git push origin minha-feature`<br>
Crie um novo Pull Request explicando suas mudanças.

## Contato
Para dúvidas ou sugestões entre em contato pelo email rnaiara92@gmail.com
