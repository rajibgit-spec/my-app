---
name: nestjs-testing
description: Generate Jest unit tests and integration tests for NestJS modules, controllers, services, DTOs, guards, pipes, and interceptors. Ensure API responses match frontend contracts and repository standards.
---

# NestJS Testing Skill

Use this skill whenever a task involves:

- Creating test files
- Fixing failing tests
- Increasing test coverage
- Testing controllers
- Testing services
- Testing DTO validation
- Testing guards
- Testing pipes
- Testing interceptors
- Testing NestJS modules

inside the `backend/` application.

---

# Testing Philosophy

Always test:

- Public behavior
- Business rules
- API contracts
- Validation rules
- Error handling
- Security behavior

Never test:

- Private methods
- NestJS framework internals
- TypeORM internals

Follow:

1. Arrange
2. Act
3. Assert

All tests must be:

- Independent
- Deterministic
- Readable
- Maintainable

---

# Coverage Targets

Minimum expectations:

- Services: 80%
- Controllers: 70%
- Guards: 80%
- DTO Validation: 80%
- Pipes: 80%
- Interceptors: 70%

---

# Step 1 - Service Unit Tests

Location:

```text
backend/src/[resource]/[resource].service.spec.ts
```

Use mocked repositories.

Never connect to a real database.

Example repository mock:

```ts
type MockRepository<T> = Partial<
  jest.Mocked<Repository<T>>
>;

const createMockRepository = <
  T,
>(): MockRepository<T> => ({
  findAndCount: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});
```

---

## Service Test Requirements

Always test:

### Creation

```ts
it('should create service', () => {});
```

### Pagination

```ts
it('should return paginated results', () => {});
```

Verify:

```ts
{
  data: [],
  meta: {
    total,
    page,
    limit,
    totalPages,
  },
}
```

### Find By Id

```ts
it('should return entity when found', () => {});
```

```ts
it('should throw NotFoundException', () => {});
```

### Create

```ts
it('should create entity', () => {});
```

### Update

```ts
it('should update entity', () => {});
```

### Delete

```ts
it('should remove entity', () => {});
```

### Error Handling

```ts
it('should propagate repository errors', () => {});
```

### Search Filtering

```ts
it('should apply search filters', () => {});
```

---

## Frontend Contract Validation

Service tests must verify the API contract expected by the Angular frontend.

List response:

```ts
{
  data: [...],
  meta: {...}
}
```

Single response:

```ts
{
  data: {...}
}
```

Verify:

- camelCase fields
- pagination metadata
- nullable values
- enum values

---

# Step 2 - Controller Integration Tests

Location:

```text
backend/src/[resource]/[resource].controller.spec.ts
```

Use:

```ts
TestingModule
INestApplication
Supertest
```

Override:

```ts
JwtAuthGuard
```

unless explicitly testing authentication.

Example:

```ts
.overrideGuard(JwtAuthGuard)
.useValue({
  canActivate: () => true,
})
```

---

## Controller Test Requirements

Always test:

### GET List

```ts
it('should return paginated resources', () => {});
```

Verify:

```ts
{
  data: [],
  meta: {}
}
```

### GET By Id

```ts
it('should return resource', () => {});
```

### POST

```ts
it('should create resource', () => {});
```

### PATCH

```ts
it('should update resource', () => {});
```

### DELETE

```ts
it('should delete resource', () => {});
```

---

## Response Status Validation

Verify:

```ts
GET     -> 200
POST    -> 201
PATCH   -> 200
DELETE  -> 204
```

Verify:

```ts
400 Validation Error
401 Unauthorized
403 Forbidden
404 Not Found
```

where applicable.

---

## UUID Validation

Controllers using:

```ts
ParseUUIDPipe
```

must include:

```ts
it('should reject invalid UUID', () => {});
```

Expected:

```ts
400 Bad Request
```

---

# Step 3 - DTO Validation Tests

Location:

```text
backend/src/[resource]/dto/
```

When DTOs contain significant validation rules, create validation tests.

Example:

```ts
create-resource.dto.spec.ts
```

Verify:

```ts
required fields
string lengths
enum values
numeric ranges
```

Example:

```ts
it('should fail when name is missing', () => {});
```

```ts
it('should fail when name exceeds max length', () => {});
```

---

# Step 4 - Guard Tests

Location:

```text
*.guard.spec.ts
```

Verify:

### Authenticated User

```ts
it('should allow request', () => {});
```

### Unauthenticated User

```ts
it('should deny request', () => {});
```

### Role-Based Access

```ts
it('should allow matching role', () => {});
```

```ts
it('should deny invalid role', () => {});
```

---

# Step 5 - Pipe Tests

Location:

```text
*.pipe.spec.ts
```

Verify:

### Valid Input

```ts
it('should transform value', () => {});
```

### Invalid Input

```ts
it('should throw BadRequestException', () => {});
```

---

# Step 6 - Interceptor Tests

Location:

```text
*.interceptor.spec.ts
```

Verify:

### Request Interception

```ts
it('should intercept request', () => {});
```

### Response Transformation

```ts
it('should transform response', () => {});
```

### Error Handling

```ts
it('should handle errors', () => {});
```

---

# Step 7 - E2E Tests

Generate E2E tests when requested.

Location:

```text
backend/test/
```

Verify:

- Authentication flows
- Full CRUD lifecycle
- Validation failures
- Authorization
- Pagination
- Filtering

Use:

```ts
Supertest
```

against a real Nest application instance.

---

# Step 8 - Mock Data Contract Verification

Backend tests must ensure compatibility with frontend expectations.

Review:

```text
frontend/src/app/features/[feature]/models/
frontend/src/app/features/[feature]/mocks/
```

Verify:

### Field Names

```ts
createdAt
updatedAt
```

not:

```ts
created_at
updated_at
```

### Response Envelope

List:

```ts
{
  data: [],
  meta: {}
}
```

Single:

```ts
{
  data: {}
}
```

---

# Step 9 - Output Format

Provide:

## Files

```text
backend/src/users/users.service.spec.ts
backend/src/users/users.controller.spec.ts
```

## Coverage

Describe:

- Success scenarios
- Validation scenarios
- Error scenarios
- Security scenarios

## Code

Provide complete file contents.

Do not provide partial snippets.

---

# Validation Checklist

Before completing:

- Spec files colocated with source
- Repository mocked
- No database access
- DTO validation tested
- Pagination tested
- NotFoundException tested
- Guard behavior tested
- ValidationPipe behavior tested
- UUID validation tested
- Frontend response contract verified
- Envelope `{ data }` verified
- Envelope `{ data, meta }` verified
- No `any`
- Strict TypeScript compliant
- Jest best practices followed
- Coverage targets satisfied