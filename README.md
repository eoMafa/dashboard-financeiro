# Dashboard Financeiro

Aplicação fullstack de **controle financeiro pessoal**: o usuário faz login e registra receitas e despesas por categoria. Um dashboard mostra o saldo e os gráficos.

> 🚧 **Projeto em desenvolvimento**, criado para estudar **NestJS**, **Prisma** e **Next.js**. Veja o roadmap no fim do README.

## Funcionalidades

- **Cadastro e login** com senha criptografada (**bcrypt**) e autenticação via **JWT**
- **Rotas protegidas** no backend (`AuthGuard('jwt')`): cada usuário só vê as próprias transações
- **Transações** de receita e despesa com título, valor e categoria
- **Dashboard** com saldo, total de receitas e de despesas, gráfico de evolução do saldo e gráfico por categoria
- **Tema claro/escuro** e layout responsivo com menu lateral

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Backend | Node.js, **NestJS 11**, TypeScript, Passport + JWT, bcrypt |
| Banco de dados | **PostgreSQL** + **Prisma ORM** (com migrations) |
| Frontend | **Next.js 16**, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Recharts, Axios |

## Estrutura

```
dashboard-financeiro/
├── backend/                 # API NestJS
│   ├── prisma/              # schema.prisma e migrations
│   └── src/
│       ├── auth/            # cadastro, login e estratégia JWT
│       ├── users/           # /users/me
│       ├── transactions/    # CRUD de transações (rotas protegidas)
│       └── prisma/          # PrismaService
└── frontend/                # Next.js (App Router)
    └── src/
        ├── app/             # páginas: dashboard e login
        ├── components/      # gráficos, cards, modal e layout
        ├── hooks/useAuth.ts # redireciona para /login sem token
        └── services/api.ts  # Axios + interceptor que envia o Bearer token
```

## Modelo de dados

```prisma
model User {
  id           String        @id @default(uuid())
  name         String
  email        String        @unique
  password     String
  transactions Transaction[]
}

model Transaction {
  id       String @id @default(uuid())
  title    String
  amount   Float
  type     String   // "income" | "expense"
  category String   @default("Other")
  userId   String
}
```

## Endpoints

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| POST | `/auth/register` | — | Cria um usuário |
| POST | `/auth/login` | — | Retorna o `access_token` (JWT) |
| GET | `/users/me` | JWT | Dados do usuário logado |
| GET | `/transactions` | JWT | Lista as transações do usuário |
| POST | `/transactions` | JWT | Cria uma transação |

## Como rodar localmente

**Pré-requisitos:** Node.js 20+ e PostgreSQL.

### Backend (porta 3001)

```bash
cd backend
npm install
cp .env.example .env              # ajuste a DATABASE_URL
npx prisma migrate dev            # cria as tabelas
npm run start:dev
```

### Frontend (porta 3000)

```bash
cd frontend
npm install
npm run dev
```

Crie um usuário pela API (a tela de cadastro ainda não existe no frontend):

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@exemplo.com","password":"123456"}'
```

Depois acesse `http://localhost:3000` e faça login.

## Roadmap

- [ ] Mover o segredo do JWT para variável de ambiente
- [ ] Validar as entradas com `class-validator` e `ValidationPipe` (hoje os DTOs não são validados)
- [ ] Não retornar o hash da senha na resposta do cadastro
- [ ] Trocar `amount` de `Float` para `Decimal` (valores monetários)
- [ ] Tela de cadastro no frontend
- [ ] Editar e excluir transações
- [ ] Calcular os cards e as porcentagens a partir dos dados reais (hoje alguns valores são fixos)
- [ ] Testes unitários dos services (`AuthService` e `TransactionsService`)
- [ ] Docker Compose e deploy

---

Desenvolvido por **Anderson Galvão** · [LinkedIn](https://www.linkedin.com/in/aqgalvaojr/)
