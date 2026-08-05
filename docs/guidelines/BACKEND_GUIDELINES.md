---
title: Diretrizes de Desenvolvimento Backend
category: backend
version: 1.0.0
last_updated: 2026-08-05
status: stable
summary: Padrões de desenvolvimento backend com Clean Architecture, padrões de código, DTOs, migrations e boas práticas.
---

# Diretrizes de Desenvolvimento — Backend

Este documento define as diretrizes para o desenvolvimento do backend do projeto **{{PROJECT_NAME}}**.

---

## 1. Stack Tecnológico

| Tecnologia | Versão | Descrição |
|------------|-------|----------|
| {{BACKEND_LANG}} | {{BACKEND_LANG_VERSION}} | Linguagem principal |
| {{BACKEND_FRAMEWORK}} | {{BACKEND_FRAMEWORK_VERSION}} | Framework principal |
| ORM | - | {{ORM_TOOL}} |
| {{DB_ENGINE}} | {{DB_VERSION}} | Banco de dados |
| {{MIGRATION_TOOL}} | - | Migrações de banco |
| {{API_DOCS_TOOL}} | - | Documentação API |
| Auth | - | Autenticação/Autorização |

---

## 2. Arquitetura de Camadas

O projeto segue **Clean Architecture** com a seguinte estrutura de pacotes:

```
{{BASE_PACKAGE}}/
├── config/                  # Configurações
├── {{APPLICATION_CLASS}}.java # Ponto de entrada
├── generic/                # Componentes genéricos reutilizáveis
│   ├── domain/            # Entidade base
│   │   └── AbstractEntity.java
│   ├── infra/
│   │   ├── controller/    # Controllers base
│   │   └── exception/     # Tratamento de exceções
│   └── util/              # Utilitários
└── [modulo]/              # Módulos funcionais
    ├── domain/            # Entidades
    ├── gateway/            # Interfaces de repositório
    ├── application/        # Serviços/Casos de uso
    └── infra/
        ├── persistence/  # Implementação de persistência
        ├── dto/          # Data Transfer Objects
        └── web/           # Controllers REST
```

---

## 3. Estrutura de Entity

### 3.1 Entidade Base

Todas as entidades devem estender a entidade base:

```java
@Entity
@Table(name = "nome_tabela")
public class EntityName extends AbstractEntity {
    @Column(nullable = false, length = 100)
    private String campo;

    // Getters e Setters
}
```

**Entidade base fornece:**
- `id` (UUID v7)
- `createdAt` (Instant)
- `updatedAt` (Instant)
- Métodos `equals()` e `hashCode()`

### 3.2 Convenções de Nomenclatura

| Tipo | Nome | Exemplo |
|------|------|---------|
| Entity | [Nome]Entity | UserEntity |
| Gateway Interface | [Nome]RepositoryGateway | UserRepositoryGateway |
| Service | [Nome]Service | UserService |
| Controller | [Nome]Controller | UserController |
| Repository (ORM) | [Nome]JpaRepository | UserJpaRepository |
| Repository Impl | [Nome]RepositoryImpl | UserRepositoryImpl |
| Request DTO | Create[Nome]Request | CreateUserRequest |
| Response DTO | [Nome]Response | UserResponse |

---

## 4. Padrão de Repository (Gateway)

### 4.1 Interface Gateway

```java
public interface UserRepositoryGateway {
    UserEntity save(UserEntity user);
    Optional<UserEntity> findById(UUID id);
    Optional<UserEntity> findByEmail(String email);
    Page<UserEntity> findAll(Pageable pageable);
    Page<UserEntity> findAll(Specification<UserEntity> spec, Pageable pageable);
    boolean existsByEmail(String email);
    void delete(UUID id);
}
```

### 4.2 Implementação

```java
@Repository
public class UserRepositoryImpl implements UserRepositoryGateway {
    private final UserJpaRepository jpaRepository;

    public UserRepositoryImpl(UserJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public UserEntity save(UserEntity user) {
        return jpaRepository.save(user);
    }

    // ...demais métodos
}
```

### 4.3 Repository ORM

```java
@Repository
public interface UserJpaRepository extends JpaRepository<UserEntity, UUID>,
        JpaSpecificationExecutor<UserEntity> {
    Optional<UserEntity> findByEmail(String email);
    boolean existsByEmail(String email);
}
```

---

## 5. Padrão de Service

```java
@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepositoryGateway userRepository;

    public UserService(UserRepositoryGateway userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity create(String name, String email) {
        log.debug("Creating user with email: {}", email);

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already registered");
        }

        UserEntity user = new UserEntity(name, email);
        UserEntity savedUser = userRepository.save(user);
        log.info("User created - ID: {}", savedUser.getId());

        return savedUser;
    }
}
```

---

## 6. Padrão de Controller

### 6.1 Controller Base

```java
@RestController
@RequestMapping("/api/users")
@Tag(name = "Users", description = "User management operations")
public class UserController extends AbstractCrudController<CreateUserRequest, UserResponse> {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Override
    protected UUID getResourceId(UserResponse response) {
        return response.id();
    }

    @Override
    protected UserResponse doFindById(UUID id) {
        return UserResponse.from(userService.findById(id));
    }

    @Override
    protected Page<UserResponse> doFindAll(Pageable pageable) {
        return userService.findAll(pageable).map(UserResponse::from);
    }

    @Override
    protected UserResponse doCreate(CreateUserRequest request) {
        return UserResponse.from(userService.create(request.name(), request.email()));
    }

    @Override
    protected UserResponse doUpdate(UUID id, CreateUserRequest request) {
        return UserResponse.from(userService.update(id, request.name(), request.email()));
    }

    @Override
    protected void doDelete(UUID id) {
        userService.deactivate(id);
    }
}
```

### 6.2 Endpoints REST

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /api/[recurso] | Lista todos com paginação |
| GET | /api/[recurso]/{id} | Busca por ID |
| POST | /api/[recurso] | Cria novo registro |
| PUT | /api/[recurso]/{id} | Atualiza registro |
| DELETE | /api/[recurso]/{id} | Inativa registro (soft delete) |

---

## 7. Padrão de DTOs

### 7.1 Request DTO

```java
public record CreateUserRequest(
    String name,
    String email,
    String password
) {}
```

### 7.2 Response DTO

```java
public record UserResponse(
    UUID id,
    String name,
    String email,
    boolean active,
    Instant createdAt,
    Instant updatedAt
) {
    public static UserResponse from(UserEntity user) {
        return new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.isActive(),
            user.getCreatedAt(),
            user.getUpdatedAt()
        );
    }
}
```

---

## 8. Banco de Dados e Migrações

### 8.1 Migrações

Arquivos de migração em `src/main/resources/db/migration/`:

```
V1__create_users_table.sql
V2__add_email_column.sql
```

### 8.2 UUID v7

Usar UUID v7 para chaves primárias ordenáveis:

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    ...
);
```

---

## 9. Paginação

Todos os endpoints de listagem devem suportar paginação:

```
GET /api/users?page=0&size=20&sort=name,asc
```

**Parâmetros:**
- `page`: Número da página (0-indexed)
- `size`: Tamanho da página
- `sort`: Ordenação (campo,direção)

---

## 10. Auditoria e Soft Delete

### 10.1 Soft Delete

Registros não são excluídos fisicamente. Utilize status:

```java
public void deactivate() {
    this.active = false;
}
```

### 10.2 Timestamps

Todas as entidades têm `createdAt` e `updatedAt` gerenciados automaticamente pela entidade base.

---

## 11. Segurança

- Anotações de autorização em endpoints de mutação
- Validação (`@Valid`) em todos os `@RequestBody`
- CORS configurado com origins explícitas
- Rate limiting em endpoints de auth
- Secrets via variáveis de ambiente (nunca hardcoded)

---

## 12. Boas Práticas

1. **Logs**: Use `log.debug()` para operações e `log.info()` para resultados
2. **Validações**: Valide dados no Service, não no Controller
3. **Exceções**: Use exceções específicas para erros de negócio
4. **Nomenclatura**: Siga os padrões de nomenclatura definidos
5. **DTOs**: Use tipos imutáveis para DTOs
6. **Construtores**: Use construtores com parâmetros para criação
7. **Paginação**: Sempre retorne `Page<T>` em listagens
8. **UUID**: Use UUID v7 para IDs

---

## 13. Estrutura de Módulo

Para criar um novo módulo, siga:

```
{{BASE_PACKAGE}}.[modulo]/
├── domain/
│   └── [Nome]Entity.java
├── gateway/
│   └── [Nome]RepositoryGateway.java
├── application/
│   └── [Nome]Service.java
└── infra/
    ├── persistence/
    │   ├── [Nome]JpaRepository.java
    │   └── [Nome]RepositoryImpl.java
    ├── dto/
    │   ├── Create[Nome]Request.java
    │   └── [Nome]Response.java
    └── web/
        └── [Nome]Controller.java
```

---

## 14. Referências

- `docs/guidelines/AI_GUIDELINES.md` — Guia geral para IAs
- `docs/guidelines/BRANCHING_STRATEGY.md` — Estratégia de branches e commits
- `docs/guidelines/FEATURE_PLANNING_GUIDELINES.md` — Planejamento de features
- Swagger UI: `http://localhost:{{BACKEND_PORT}}/swagger-ui.html`
