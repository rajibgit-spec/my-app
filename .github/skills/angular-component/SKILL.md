---
name: angular-component
description: Generate Angular 17+ standalone components using Angular Signals, OnPush change detection, modern control flow syntax, SCSS styling, accessibility best practices, and Jest tests. Use when creating or scaffolding Angular components inside the frontend application.
---

# Angular Component Generation Skill

Use this skill whenever the task involves creating a new Angular component inside the `frontend/` application.

---

# Step 1 - Gather Context

Before generating code:

1. Review the active agent instructions.
2. Check `frontend/angular.json` for selector prefix and style configuration.
3. Check `frontend/src/environments/environment.ts`.
4. Scan existing components under:
   - `frontend/src/app/shared/components/`
   - `frontend/src/app/features/`
5. Follow existing implementation patterns before introducing new ones.

---

# Step 2 - Determine Component Type

## Feature Component

Location:

```text
frontend/src/app/features/[feature]/components/
```

Examples:

```text
employee-list
employee-details
leave-request-form
```

Used for:

- Pages
- Containers
- Feature workflows
- Smart components

---

## Shared Component

Location:

```text
frontend/src/app/shared/components/
```

Used for:

- Reusable UI
- Presentational components
- Form controls
- Table wrappers
- Dialog components

---

## Layout Component

Location:

```text
frontend/src/app/core/layout/
```

Examples:

```text
header
sidebar
footer
shell
```

Used for:

- Application shell
- Navigation
- Layout composition

---

# Step 3 - Generate Component Files

Use modern Angular file naming.

Component files:

```text
[name].ts
[name].html
[name].scss
[name].spec.ts
```

Example:

```text
employee-list.ts
employee-list.html
employee-list.scss
employee-list.spec.ts
```

---

## Component Class

```ts
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-[name]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './[name].html',
  styleUrls: ['./[name].scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class [Name]Component {
  private readonly destroyRef = inject(DestroyRef);

  // Inputs
  // readonly items = input<Item[]>([]);

  // Required Inputs
  // readonly title = input.required<string>();

  // Outputs
  // readonly selected = output<Item>();

  // Local state
  // readonly isLoading = signal(false);

  // Derived state
  // readonly isEmpty = computed(() => this.items().length === 0);
}
```

---

## Component Rules

Always:

- Use standalone components
- Use `ChangeDetectionStrategy.OnPush`
- Use `input()`, `input.required()`, `output()`, `model()`
- Use Angular Signals
- Use `computed()` for derived state
- Use `inject()` instead of constructor injection
- Use typed values only
- Use explicit access modifiers

Never:

- Use `@Input()`
- Use `@Output()`
- Use `any`
- Use constructor injection
- Import mock files directly
- Perform HTTP calls directly from components
- inline templates or styles
---

# Step 4 - Generate Template

Example:

```html
<div class="[name]-container">

  @if (isLoading()) {
    <div class="loading-state">
      Loading...
    </div>
  } @else if (isEmpty()) {
    <div class="empty-state">
      No items found.
    </div>
  } @else {
    <ul class="item-list">
      @for (item of items(); track item.id) {
        <li class="item-list__item">
          {{ item.name }}
        </li>
      }
    </ul>
  }

</div>
```

---

## Template Rules

Always:

- Use `@if`
- Use `@else`
- Use `@switch`
- Use `@for`
- Use `track` in every loop

Prefer:

- `@defer` for heavy content
- Semantic HTML
- Accessible markup
- ARIA attributes where applicable

Never:

- Use `*ngIf`
- Use `*ngFor`
- Skip track expressions

---

# Step 5 - Generate SCSS

```scss
:host {
  display: block;
}

.[name]-container {
}

.loading-state {
}

.empty-state {
}

.item-list {
  list-style: none;
  margin: 0;
  padding: 0;

  &__item {
  }
}
```

---

## Styling Rules

Always:

- Scope styles to component
- Use BEM naming
- Support responsive layouts
- Follow Material 3 patterns
- Follow Fluent Design principles
- Ensure proper spacing

Prefer:

- Border radius: 12px–16px
- Subtle shadows
- Modern typography
- Smooth transitions
- Accessible color contrast

Never:

- Use global overrides
- Target unrelated components
- Use fixed pixel-heavy layouts

---

# Step 6 - Generate Tests

Create a co-located test file.

Example:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListComponent } from './employee-list';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

---

## Test Rules

Always include:

- Component creation test
- Input behavior tests
- Output event tests
- Rendering tests
- State handling tests
- Accessibility checks where applicable

Mock:

- Services
- Route dependencies
- HTTP interactions

Never:

- Test internal Angular behavior
- Depend on implementation details

---

# Step 7 - Output Format

Provide:

## Files

List all files created or modified.

Example:

```text
frontend/src/app/features/employees/components/employee-list.ts
frontend/src/app/features/employees/components/employee-list.html
frontend/src/app/features/employees/components/employee-list.scss
frontend/src/app/features/employees/components/employee-list.spec.ts
```

## Code

Provide complete file contents.

Do not provide partial snippets.

## Usage

Include:

- Where the component belongs
- How it is imported
- Example usage
- Inputs and outputs

---

# Validation Checklist

Before completing:

- Correct folder location
- Correct selector prefix
- Standalone component
- OnPush change detection
- Signal-based inputs and outputs
- No `@Input()` / `@Output()`
- No `any`
- No mock imports
- `@if` and `@for` used correctly
- `track` used in every loop
- SCSS created
- Spec file created
- Matches existing application patterns
- Accessibility considered
- TypeScript compilation passes