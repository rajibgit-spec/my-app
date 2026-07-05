---
description: These instructions apply to every Copilot session across this monorepo including frontend, backend, and shared tooling.
applyTo: "**"
---

# Monorepo Copilot Guidance

This repository uses GitHub Copilot Instructions, Agents, and Skills.

## Instruction Hierarchy

Always follow guidance in this order:

1. Repository Instructions (copilot-instructions.md)
2. Selected Agent Instructions
3. Selected Skill Instructions
4. User Request

When guidance conflicts:

- Skill instructions override agent implementation details.
- Agent instructions override general implementation details.
- Repository instructions remain the source of truth for architecture, folder structure, coding standards, and technology choices.

---

# Agent and Skill Selection

Before generating code:

1. Identify which part of the monorepo is affected.
2. Select the appropriate agent.
3. Evaluate whether a skill matches the request.
4. If a matching skill exists, load and follow the skill workflow exactly.
5. Follow existing patterns before introducing new approaches.

## Available Agents

### angular-frontend

Use for:

- Angular components
- Angular services
- State management
- Routing
- RxJS
- Angular Material
- Frontend testing

### angular-backend

Use for:

- NestJS modules
- Controllers
- Services
- DTOs
- Entities
- Backend testing
- Database integration

## Available Skills

### Frontend Skills

- angular-component
- angular-service
- angular-testing

### Backend Skills

- nestjs-module
- nestjs-testing

---

# Monorepo Structure

```text
my-project/
├── .github/
│   ├── copilot-instructions.md
│   ├── agents/
│   │   ├── angular-frontend.agent.md
│   │   └── angular-backend.agent.md
│   └── skills/
│       ├── angular-component/
│       ├── angular-service/
│       ├── angular-testing/
│       ├── nestjs-module/
│       └── nestjs-testing/
├── frontend/
├── backend/
└── package.json
```

---

# Running Applications

## Frontend

```bash
cd frontend && npm start
```

URL:

```text
http://localhost:4200
```

## Backend

```bash
cd backend && npm run start:dev
```

URL:

```text
http://localhost:3000
```

## Full Monorepo

```bash
npm run dev
```

---

# Technology Stack

## Frontend (frontend/)

- Angular 17+
- Standalone Components
- Angular Signals
- Angular Material
- RxJS
- SCSS
- Angular Testing Library
- Jest
- ESLint

### UI Standards

Design should resemble:

- Microsoft Fluent Design
- Azure Portal
- Jira Cloud
- Linear
- Notion
- Modern SaaS HRMS platforms

Avoid:

- Basic Angular Material defaults
- Generic admin templates
- Bright colorful cards
- Plain HTML table layouts

Prefer:

- Material 3
- Soft shadows
- Rounded corners (12px-16px)
- Consistent spacing
- Professional typography
- Responsive layouts
- Smooth transitions
- Accessibility-first design

---

## Backend (backend/)

- NestJS 10+
- TypeScript 5+
- PostgreSQL (MANDATORY)
- TypeORM 0.3+
- JWT Authentication
- Swagger
- Jest
- Supertest

### Backend Database Policy

Backend implementations must always use PostgreSQL persistence.

Forbidden:

- Mock repositories
- Mock services
- In-memory arrays
- Hardcoded datasets
- Temporary fake services
- Fake repository implementations

Invalid Examples:

```ts
const users = [];
const orders = [];
const products = [];
```

Application data must never be stored in memory.

Every CRUD feature must persist data through PostgreSQL using TypeORM.

---

## Shared Tooling

- npm
- Node.js 20 LTS
- GitHub Actions
- Husky
- lint-staged

---

# Mock Data Strategy

Frontend development must support backend-independent development.

## Frontend Rules

Until the backend API is available:

- Services must evaluate environment.useMockData.
- Components must remain unaware of mock versus real data.
- Every new frontend service must have a matching mock file.
- Services must implement both:
  - Mock implementation
  - Real API implementation

Mock file location:

```text
frontend/src/app/features/[feature]/mocks/
```

Example:

```ts
return of(mockData).pipe(delay(300));
```

Never:

- Import mocks into components.
- Enable useMockData in production.
- Skip mock implementation.

## Backend Rules

Backend applications must never use mock data.

Forbidden:

- Mock services
- Mock repositories
- Hardcoded collections
- Static arrays
- Temporary fake persistence

Backend data must always come from PostgreSQL.

---

# Frontend Environment Requirements

Before implementing any frontend feature:

- Verify environment.ts exists.
- Verify environment.prod.ts exists.
- Create missing files if absent.
- Verify useMockData exists.
- Create useMockData if missing.

Required files:

```text
frontend/src/environments/environment.ts
frontend/src/environments/environment.prod.ts
```

Development:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1',
  useMockData: true
};
```

Production:

```ts
export const environment = {
  production: true,
  apiUrl: 'https://your-api.com/api/v1',
  useMockData: false
};
```

A frontend implementation is incomplete if these files are missing.

---

# Backend Environment Requirements

Before implementing any backend feature:

- Verify backend/.env exists.
- Create backend/.env if missing.
- Verify PostgreSQL variables exist.

Required file:

```text
backend/.env
```

Example:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USER=postgres
DB_PASS=postgres

JWT_SECRET=change-me
JWT_EXPIRES_IN=15m

REFRESH_TOKEN_SECRET=change-me
REFRESH_TOKEN_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:4200
```

A backend implementation is incomplete if .env is missing.

---

# Database First Policy

Backend development follows a database-first approach.

Every backend feature must include:

- Entity
- DTOs
- Controller
- Service
- Module
- Repository Injection
- Migration
- TypeORM Registration
- Tests

A feature is incomplete if any are missing.

---

# TypeORM Requirements

Every backend application must include database configuration.

Required:

```text
backend/src/config/database.config.ts
```

or

```text
backend/src/database/data-source.ts
```

Requirements:

- Load configuration from .env
- PostgreSQL only
- TypeORM only
- Entity registration
- Migration configuration

Migration location:

```text
backend/src/database/migrations/
```

Every entity change must include a migration.

Missing migrations are considered incomplete implementations.

---

# Root Package.json

Verify root package.json exists.

If missing, create it.

Location:

```text
/package.json
```

Required scripts:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run fe\" \"npm run be\"",
    "fe": "cd frontend && npm start",
    "be": "cd backend && npm run start:dev",
    "fe:test": "cd frontend && npm test",
    "be:test": "cd backend && npm test",
    "fe:build": "cd frontend && npm run build",
    "be:build": "cd backend && npm run build",
    "lint": "concurrently \"npm run fe:lint\" \"npm run be:lint\""
  }
}
```

A monorepo implementation is incomplete if the root package.json is missing.

---

# Folder Structure

## Frontend

```text
frontend/src/app/
├── core/
├── shared/
├── features/
│   └── [feature]/
│       ├── components/
│       ├── models/
│       ├── services/
│       ├── mocks/
│       └── [feature].routes.ts
└── app.routes.ts
```

## Backend

```text
backend/src/
├── auth/
├── common/
├── config/
├── database/
│   └── migrations/
└── [feature]/
```

---

# API Standards

## Success Response

```json
{
  "data": {}
}
```

## Paginated Response

```json
{
  "data": [],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

## Error Response

```json
{
  "statusCode": 400,
  "message": [
    "email must be an email"
  ],
  "error": "Bad Request",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

Base URL:

```text
/api/v1
```

---

# TypeScript Standards

Both frontend and backend must follow:

- "strict": true
- Never use any
- Never use @ts-ignore
- Never use @ts-nocheck
- Explicit return types
- Prefer interfaces
- Prefer const
- Use readonly where appropriate
- Use optional chaining
- Use nullish coalescing

---

# Code Quality Rules

## All Projects

- No console.log
- No hardcoded secrets
- No commented-out code
- JSDoc on public APIs
- Every new file requires tests

Coverage Targets:

- Services: 80%+
- Components: 70%+
- Controllers: 70%+

## Frontend

- No document.querySelector
- No ngModel with reactive forms
- Always use track in @for
- Never use setTimeout for Angular state management
- No direct mock imports into components

## Backend

- Never use synchronize: true in production
- Never expose persistence entities directly
- Always hash passwords with bcrypt (12 rounds)
- Never expose stack traces
- Secure endpoints by default

---

# Backend Availability Process

When backend APIs become available:

1. Set useMockData to false.
2. Verify API contract compatibility.
3. Remove mock branches from services.
4. Remove feature mock files.
5. Verify components require no changes.

Frontend components must remain unchanged during backend migration.

---

# Mandatory Completion Validation

A task must not be reported as complete until all validations pass.

## Frontend

✓ environment.ts exists

✓ environment.prod.ts exists

✓ useMockData exists

✓ mock files created

✓ services support mock/API switching

✓ tests created

✓ components do not import mocks

---

## Backend

✓ .env exists

✓ PostgreSQL configured

✓ TypeORM configured

✓ entity created

✓ DTOs created

✓ repository injected

✓ migration created

✓ service created

✓ controller created

✓ module created

✓ swagger documentation added

✓ tests created

✓ no mock data used

---

## Monorepo

✓ root package.json exists

✓ required scripts exist

✓ project structure follows repository standards