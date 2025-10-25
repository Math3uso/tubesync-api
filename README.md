# TubeSync API 🎵

## Este README está em desenvolvimento

Uma API RESTful para busca e streaming de conteúdo do YouTube, com foco em música e vídeos. Desenvolvida com Fastify, TypeScript.

## Funcionalidades
- 🔍 Busca de músicas/vídeos - Pesquisa conteúdo do YouTube por termo

- 📺 Busca de canais - Encontra videos de canais específicos

- 🎵 Streaming de áudio - Obtém URLs diretas para reprodução de mídia

- 🔐 Autenticação completa - Login, registro, JWT e refresh tokens
- 📚 Documentação Swagger - API totalmente documentada

## 🚀 Tecnologias

- Fastify - Framework web rápido e eficiente
- TypeScript - Tipagem estática
- JWT - Autenticação segura
- Swagger - Documentação interativa da API
- ytdl-core - Extração de dados do YouTube
- API oficinal do Youtube - Para buscas mais detalhadas
- Zod - Validação de schemas
- PostgreSQL - Banco de dados relacional
- Docker - Containerização da aplicação
- Docker Compose - Orquestração de containers
- Vitest - Para testes unitários e E2E
- Supertest - Testes de integração HTTP

## ⚡ Instalação (com Docker compose 🐳)

```bash

# Clone o repositório
git clone https://github.com/Math3uso/tubesync-api.git
cd tubesync-api

# Instale as dependências
npm install


# Configure as variáveis de ambiente
cp .env.example .env

# Certifique-se de substituir o conteudo de YOUTUBE_API_KEY pela sua chave

# Inicie as migrations

npx prisma migrate dev

# Inicie o servidor
npm run dev

```

### Certifique-se de que exista um arquivo .env na raiz do projeto com um conteúdo semelhante a este:

```bash

NODE_ENV=dev

YOUTUBE_API_KEY=api-key

JWT_SECRET=secret123123

DATABASE_URL="postgresql://docker:docker@localhost:5432/search-yt?schema=public"
```

## 📖 Endpoints Principais

### 🔍 Busca
- `GET /search?name=video_name` - Busca vídeos/músicas
- `GET /search/channel?id=id` - Busca canais (Pelo id)

### 🎵 Reprodução
- `GET /play?id=video_id` - Obtém URL de streaming

### 🔐 Autenticação
- `GET /user/register` - Registro de usuário
- `GET /user/auth` - Login
- `GET /user/refrash` - Renovar token
- `GET /user/profile` - Perfil

## 📚 Documentação
Acesse a documentação interativa do Swagger em:
```bash
http://localhost:3001/docs
```

## 🧪 Testes
A aplicação possui cobertura completa de testes unitários e end-to-end.

### Executar Testes
```bash
# Testes unitarios unitarios
npm run test:unit

# Apenas testes E2E
npm run test:e2e

```
