---
name: angular-testing
description: Generate Jest unit and integration tests for Angular standalone components, services, state services, guards, pipes, and directives. Supports both mock-data and real API testing patterns.
---

# Angular Testing Skill

Use this skill whenever the task involves:

- Creating spec files
- Fixing failing Angular tests
- Increasing test coverage
- Testing components
- Testing services
- Testing state services
- Testing guards
- Testing pipes
- Testing directives

within the `frontend/` application.

---

# Testing Philosophy

Always test:

- Public behavior
- User interactions
- Inputs and outputs
- Rendered UI
- Service contracts
- Observable results
- Signal state changes

Never test:

- Internal implementation details
- Private methods
- Angular framework functionality

Follow:

- Arrange
- Act
- Assert (AAA)

Every test must be:

- Deterministic
- Isolated
- Readable
- Maintainable

---

# Coverage Targets

Minimum expectations:

- Services: 80%
- State Services: 80%
- Guards: 80%
- Pipes: 80%
- Components: 70%
- Directives: 70%

---

# Step 1 - Component Tests

Location:

```text
frontend/src/app/**/[name].spec.ts
```

Component example:

```text
employee-list.ts
employee-list.spec.ts
```

Example:

```ts
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { EmployeeListComponent } from './employee-list';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      EmployeeListComponent
    );

    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
```

---

## Component Test Requirements

Always test:

### Creation

```ts
it('should create', () => {});
```

### Loading State

```ts
it('should display loading state', () => {});
```

### Empty State

```ts
it('should display empty state', () => {});
```

### Rendered Data

```ts
it('should render items', () => {});
```

### Input Signals

```ts
it('should respond to input changes', () => {});
```

### Output Events

```ts
it('should emit selection event', () => {});
```

### Accessibility

```ts
it('should expose accessible labels', () => {});
```

---

# Step 2 - Service Tests

Location:

```text
frontend/src/app/features/[feature]/services/[resource].service.spec.ts
```

Services must be tested in both modes.

---

## Mock Mode

```ts
environment.useMockData === true
```

Verify:

- No HTTP requests occur
- Mock data is returned
- CRUD operations update mock collections
- Delays work correctly

Example:

```ts
it('should return mock data', fakeAsync(() => {
  let result;

  service.getAll().subscribe(
    response => (result = response)
  );

  tick(300);

  expect(result).toBeDefined();

  httpMock.expectNone(baseUrl);
}));
```

---

## Real API Mode

```ts
environment.useMockData === false
```

Verify:

- Correct endpoint
- Correct method
- Correct query params
- Correct request body
- Correct response mapping
- Error propagation

Example:

```ts
it('should call GET endpoint', () => {
  service.getAll().subscribe();

  const request = httpMock.expectOne(
    `${baseUrl}?page=1&limit=20`
  );

  expect(request.request.method).toBe('GET');
});
```

---

## Service Test Requirements

Always test:

### Creation

```ts
it('should create service', () => {});
```

### Get List

```ts
it('should retrieve items', () => {});
```

### Get By Id

```ts
it('should retrieve entity by id', () => {});
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
it('should delete entity', () => {});
```

### Error Handling

```ts
it('should handle API errors', () => {});
```

---

# Step 3 - State Service Tests

Location:

```text
frontend/src/app/features/[feature]/services/[resource]-state.service.spec.ts
```

Signals must be validated.

Always test:

### Initial State

```ts
it('should initialize with default values', () => {});
```

### State Updates

```ts
it('should update items', () => {});
```

### Computed Signals

```ts
it('should update computed values', () => {});
```

### Reset State

```ts
it('should reset state', () => {});
```

Example:

```ts
expect(service.items()).toEqual([]);
expect(service.isLoading()).toBe(false);
expect(service.hasItems()).toBe(false);
```

---

# Step 4 - Guard Tests

Location:

```text
auth.guard.spec.ts
```

Verify:

- Authenticated users pass
- Unauthenticated users redirect
- Route data is respected

Example:

```ts
it('should allow navigation', () => {});

it('should block navigation', () => {});
```

---

# Step 5 - Pipe Tests

Location:

```text
date-format.pipe.spec.ts
```

Verify:

- Correct transformation
- Null handling
- Undefined handling
- Edge cases

Example:

```ts
it('should format date correctly', () => {});
```

---

# Step 6 - Directive Tests

Location:

```text
highlight.directive.spec.ts
```

Verify:

- Directive initialization
- DOM behavior
- Input changes
- Cleanup behavior

Example:

```ts
it('should apply highlight styles', () => {});
```

---

# Step 7 - Test Data Rules

Always:

- Use realistic test data
- Use mock files where available
- Reset mutable state between tests
- Keep tests independent

Never:

- Use magic strings repeatedly
- Depend on test execution order
- Share mutable state across tests

---

# Step 8 - Mock Data Testing

When testing mock mode:

Verify:

```ts
httpMock.expectNone(...)
```

Advance delays using:

```ts
fakeAsync(...)
tick(300)
```

Reset mock collections before every test.

Example:

```ts
beforeEach(() => {
  resetMockData();
});
```

---

# Step 9 - API Testing

Verify:

### GET

```ts
expect(req.request.method).toBe('GET');
```

### POST

```ts
expect(req.request.method).toBe('POST');
```

### PATCH

```ts
expect(req.request.method).toBe('PATCH');
```

### DELETE

```ts
expect(req.request.method).toBe('DELETE');
```

Also verify:

- Params
- Headers
- Payload
- Response mapping

---

# Step 10 - Output Format

Provide:

## Files

```text
frontend/src/app/features/employees/services/employee.service.spec.ts
frontend/src/app/features/employees/services/employee-state.service.spec.ts
frontend/src/app/features/employees/components/employee-list.spec.ts
```

## Code

Provide complete test file contents.

Do not provide partial snippets.

## Coverage

State what scenarios are covered.

---

# Validation Checklist

Before completing:

- Spec file colocated with source
- Standalone components imported correctly
- Mock mode tested
- Real API mode tested
- HTTP requests validated
- Signals tested
- Input signals tested
- Output events tested
- Error scenarios tested
- Edge cases covered
- No `any`
- No implementation-detail testing
- Coverage targets met
- TypeScript strict-mode compliant