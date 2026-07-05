---
name: nestjs-module
description: Generate a complete NestJS feature module including controller, service, entity, DTOs, module registration, Swagger documentation, validation, and tests. Use for CRUD resources and API feature development inside backend/.
---

# NestJS Module Generation Skill

Use this skill whenever a request involves:

- Creating a new feature module
- Creating CRUD APIs
- Creating controllers
- Creating services
- Creating DTOs
- Creating TypeORM entities
- Creating backend resources

inside the `backend/` application.

---

# Step 1 - Gather Context

Before generating code:

1. Review existing patterns inside `backend/src/`.
2. Review frontend models and mock files when available.
3. Review shared utilities under:
   - `backend/src/common/`
   - `backend/src/auth/`
4. Match existing architecture and coding patterns.

Never introduce a new pattern if an established pattern already exists.

---

# Step 2 - Review Frontend Contract

If the corresponding frontend feature exists, review:

```text
frontend/src/app/features/[feature]/models/
frontend/src/app/features/[feature]/mocks/
```

Backend responses must match frontend expectations exactly.

Verify:

- Field names
- Pagination structure
- Data types
- Nullable fields
- Enum values

The goal is:

```text
Mock API → Real API
```

with zero frontend code changes.

---

# Step 3 - Generate Module Structure

Create:

```text
backend/src/[resource]/
├── dto/
│   ├── create-[resource].dto.ts
│   ├── update-[resource].dto.ts
│   └── [resource]-query.dto.ts
├── entities/
│   └── [resource].entity.ts
├── [resource].controller.ts
├── [resource].controller.spec.ts
├── [resource].service.ts
├── [resource].service.spec.ts
└── [resource].module.ts
```

Register the module inside:

```text
backend/src/app.module.ts
```

or the appropriate parent module.

---

# Step 4 - Generate Entity

Location:

```text
backend/src/[resource]/entities/[resource].entity.ts
```

Requirements:

```ts
@Entity('[resource]s')
export class ResourceEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
```

Entity Rules:

- UUID primary keys
- Explicit column definitions
- Timestamps included
- No business logic
- No API decorators
- Database-focused only

Always align with frontend model contracts.

---

# Step 5 - Generate DTOs

Location:

```text
backend/src/[resource]/dto/
```

Generate:

### Create DTO

```ts
export class CreateResourceDto {}
```

### Update DTO

```ts
export class UpdateResourceDto
  extends PartialType(CreateResourceDto) {}
```

### Query DTO

```ts
export class ResourceQueryDto {}
```

---

## DTO Rules

Always:

- Use `class-validator`
- Use `class-transformer`
- Use `@ApiProperty()`
- Use `@ApiPropertyOptional()`
- Validate every field

Example:

```ts
@ApiProperty()
@IsString()
@MaxLength(100)
name!: string;
```

Numeric query params:

```ts
@Type(() => Number)
@IsInt()
```

---

# Step 6 - Generate Service

Location:

```text
backend/src/[resource]/[resource].service.ts
```

Example:

```ts
@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly repository: Repository<ResourceEntity>,
  ) {}

  /**
   * Returns paginated resources.
   */
  async findAll(
    query: ResourceQueryDto,
  ): Promise<PaginatedResponse<ResourceEntity>> {
    ...
  }
}
```

---

## Service Rules

Always:

- Explicit return types
- Throw NestJS exceptions
- Use repository pattern
- Use `findAndCount()` for pagination
- Use transactions for multi-step writes
- Add JSDoc comments

Use:

```ts
throw new NotFoundException();
```

Never:

```ts
return null;
```

---

## Pagination Response

Must match frontend contract.

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

---

## Single Resource Response

Must match frontend contract.

```ts
{
  data: {
    id: '...'
  }
}
```

---

# Step 7 - Generate Controller

Location:

```text
backend/src/[resource]/[resource].controller.ts
```

Always include:

```ts
@ApiTags()
@ApiOperation()
@ApiResponse()
@ApiBearerAuth()
```

Example:

```ts
@Get()
@ApiOperation({
  summary: 'Get resources',
})
findAll(): Promise<...> {
  ...
}
```

---

## Controller Rules

Always:

- Thin controllers
- Delegate to services
- Use DTOs
- Use ParseUUIDPipe
- Use proper status codes
- Use authentication guards
- Document endpoints with Swagger

Never:

- Write business logic
- Access repositories

---

## Route Rules

### GET

```ts
@Get()
```

### GET BY ID

```ts
@Get(':id')
```

### POST

```ts
@Post()
@HttpCode(HttpStatus.CREATED)
```

### PATCH

```ts
@Patch(':id')
```

### DELETE

```ts
@Delete(':id')
@HttpCode(HttpStatus.NO_CONTENT)
```

---

# Step 8 - Generate Module

Location:

```text
backend/src/[resource]/[resource].module.ts
```

Example:

```ts
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResourceEntity,
    ]),
  ],
  controllers: [
    ResourceController,
  ],
  providers: [
    ResourceService,
  ],
  exports: [
    ResourceService,
  ],
})
export class ResourceModule {}
```

---

# Step 9 - Generate Tests

Create:

```text
[resource].controller.spec.ts
[resource].service.spec.ts
```

Verify:

### Service

- Creation
- Pagination
- Create
- Update
- Delete
- Not Found exceptions

### Controller

- Endpoint wiring
- DTO handling
- Status codes
- Service delegation

Use Jest.

No `any`.

---

# Step 10 - Output Format

Provide:

## API Contract

### List

```http
GET /api/v1/resources
```

### Get By Id

```http
GET /api/v1/resources/:id
```

### Create

```http
POST /api/v1/resources
```

### Update

```http
PATCH /api/v1/resources/:id
```

### Delete

```http
DELETE /api/v1/resources/:id
```

---

## Frontend Contract Alignment

Explain how the backend response matches:

```text
frontend/src/app/features/[feature]/models/
frontend/src/app/features/[feature]/mocks/
```

---

## Files

List all created and modified files.

---

## Code

Provide complete file contents.

Do not provide partial snippets.

---

## Tests

Provide generated `.spec.ts` files.

---

# Validation Checklist

Before completing:

- Frontend contract reviewed
- Module created
- Entity created
- DTOs created
- Service created
- Controller created
- Module registered
- Swagger decorators added
- Validation decorators added
- ParseUUIDPipe used
- Guards applied
- Pagination envelope matches frontend
- Single-resource envelope matches frontend
- UUID primary key used
- No any types
- Explicit return types present
- JSDoc added
- Tests generated
- TypeScript strict-mode compliant
