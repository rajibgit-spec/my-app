---
name: angular-service
description: Generate Angular services that support both backend APIs and mock data using environment.useMockData. Creates typed models, mock files, services, signal-based state services, and Jest unit tests.
---

# Angular Service Generation Skill

Use this skill whenever the task involves creating:

- HTTP API services
- Feature data services
- State management services
- Repository-style services
- CRUD services

inside the `frontend/` application.

---

# Step 1 - Gather Context

Before generating code:

1. Review active Angular agent instructions.
2. Check `frontend/src/environments/environment.ts`.
3. Verify the feature folder structure.
4. Review existing services in the feature.
5. Match existing naming and implementation patterns.

Always follow established project conventions before creating new ones.

---

# Step 2 - Determine Service Type

## HTTP Service

Location:

```text
frontend/src/app/features/[feature]/services/
```

Used for:

- Backend communication
- CRUD operations
- Search/filter endpoints
- File uploads/downloads

---

## State Service

Location:

```text
frontend/src/app/features/[feature]/services/
```

Used for:

- Signal-based UI state
- Selection state
- Loading state
- Error state

---

## Shared/Core Service

Location:

```text
frontend/src/app/core/services/
```

Used for:

- Authentication
- Notifications
- Logging
- Shared infrastructure concerns

---

# Step 3 - Generate Models

Always generate typed models.

File:

```text
frontend/src/app/features/[feature]/models/[name].model.ts
```

Example:

```ts
export interface Employee {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmployeeDto {
  name: string;
}

export interface UpdateEmployeeDto
  extends Partial<CreateEmployeeDto> {}
```

---

## Shared API Models

Ensure the following shared model exists.

File:

```text
frontend/src/app/core/models/paginated-response.model.ts
```

```ts
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
```

---

# Step 4 - Generate Mock File

Always generate a mock file.

Location:

```text
frontend/src/app/features/[feature]/mocks/[resource].mock.ts
```

Example:

```ts
// TODO: remove when backend ready

import { Employee } from '../models/employee.model';

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'John Smith',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    createdAt: '2026-01-02T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
  },
];
```

---

## Mock Rules

Always:

- Match backend field names exactly.
- Use realistic business data.
- Include at least two records.
- Simulate network latency.

Use:

```ts
of(data).pipe(delay(300));
```

Never:

```ts
of(data);
```

---

# Step 5 - Generate Service

Location:

```text
frontend/src/app/features/[feature]/services/[resource].service.ts
```

Example:

```ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  catchError,
  delay,
  map,
} from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl =
    `${environment.apiUrl}/employees`;

  /**
   * Returns paginated employees.
   */
  getAll(
    page = 1,
    limit = 20
  ): Observable<PaginatedResponse<Employee>> {
    if (environment.useMockData) {
      return of(MOCK_EMPLOYEES_PAGINATED).pipe(
        delay(300)
      );
    }

    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    return this.http
      .get<PaginatedResponse<Employee>>(
        this.baseUrl,
        { params }
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(
    error: unknown
  ): Observable<never> {
    return throwError(() => error);
  }
}
```

---

# Service Rules

Always:

- Use `providedIn: 'root'`
- Use `inject()`
- Use `environment.apiUrl`
- Return typed observables
- Use explicit return types
- Add JSDoc to public methods
- Include mock support

Never:

- Use constructor injection
- Use `any`
- Hardcode URLs
- Access mock data directly from components

---

# CRUD Requirements

Generate:

```ts
getAll()
getById()
create()
update()
delete()
```

whenever the resource is CRUD-based.

Every method must contain:

```ts
if (environment.useMockData) {
  ...
}
```

Mock CRUD operations must mutate the in-memory array.

---

# Step 6 - Generate State Service

File:

```text
frontend/src/app/features/[feature]/services/[resource]-state.service.ts
```

Example:

```ts
import {
  Injectable,
  computed,
  signal,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeStateService {
  private readonly itemsSignal =
    signal<Employee[]>([]);

  private readonly loadingSignal =
    signal(false);

  readonly items =
    this.itemsSignal.asReadonly();

  readonly isLoading =
    this.loadingSignal.asReadonly();

  readonly hasItems = computed(
    () => this.items().length > 0
  );

  setItems(
    items: Employee[]
  ): void {
    this.itemsSignal.set(items);
  }

  setLoading(
    value: boolean
  ): void {
    this.loadingSignal.set(value);
  }
}
```

---

# State Service Rules

Always:

- Use signals.
- Use computed signals.
- Expose readonly signals.
- Encapsulate mutations.

Never:

- Expose writable signals publicly.
- Use Subjects when signals are sufficient.

---

# Step 7 - Generate Tests

Location:

```text
frontend/src/app/features/[feature]/services/[resource].service.spec.ts
```

Tests must cover:

- Service creation
- Mock path
- API path
- CRUD operations
- Error handling
- Pagination handling

Example:

```ts
describe('EmployeeService', () => {
  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return mock data', () => {
    ...
  });

  it('should call API', () => {
    ...
  });

  it('should handle API errors', () => {
    ...
  });
});
```

Never use:

```ts
(environment as any)
```

Use proper mocks or test configuration wherever possible.

---

# Step 8 - Backend Migration

When backend is ready:

1. Set:

```ts
useMockData: false
```

2. Verify endpoints.

3. Remove:

```ts
if (environment.useMockData)
```

blocks.

4. Delete:

```text
frontend/src/app/features/[feature]/mocks/
```

5. Components must not require modifications.

---

# Output Format

Provide:

## Files

```text
frontend/src/app/features/employees/models/employee.model.ts
frontend/src/app/features/employees/mocks/employees.mock.ts
frontend/src/app/features/employees/services/employee.service.ts
frontend/src/app/features/employees/services/employee-state.service.ts
frontend/src/app/features/employees/services/employee.service.spec.ts
```

## Code

Provide complete file contents.

Do not provide partial snippets.

## Usage

Include:

- Injection example
- Service method examples
- State service usage

---

# Validation Checklist

Before completing:

- Model generated
- Mock file generated
- Service generated
- State service generated
- Spec file generated
- Mock toggle implemented
- API URL from environment
- No hardcoded URLs
- No any types
- JSDoc present
- Signals used correctly
- Mock CRUD mutates data
- TypeScript strict mode compliant
- Matches existing project patterns