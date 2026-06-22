---
name: api-contract
description: Design REST and GraphQL APIs with consistent conventions, OpenAPI specs, versioning, and schema-first approach
license: MIT
compatibility: opencode
min_version: 1.0.0
scope: [project]
tags: [api, design, rest, openapi, backend]
metadata:
  source: https://github.com/weisser-dev/awesome-opencode
  adapted-for: opencode
---

# API Contract

## What I Do

- Design resource-oriented REST endpoints with proper HTTP verbs and status codes
- Define request/response schemas with OpenAPI/AsyncAPI specifications
- Plan API versioning strategy (URI, header, or content negotiation)
- Generate complete OpenAPI specs from requirements
- Review existing APIs for consistency, naming, pagination, and error format issues

## When to Use

Use this skill when you need to:
- Design a new API from scratch
- Document an existing API with OpenAPI specs
- Review an API design for consistency and best practices
- Standardize error formats, pagination, and naming across services
- Generate API client libraries from specs

## Design Principles

- Resource-oriented URLs (`/users/{id}/orders` not `/getUserOrders`)
- Consistent error format with code, message, and details
- Pagination via cursor or offset with Link headers
- Proper use of HTTP status codes (201 Created, 204 No Content, 409 Conflict)
- HATEOAS links where beneficial
- Idempotent operations for PUT/DELETE
- Rate limiting headers (X-RateLimit-*)

## Process

1. **Understand requirements**: Gather endpoint descriptions, data models, and workflows
2. **Design resource model**: Map domain entities to API resources
3. **Define endpoints**: Specify each operation with method, path, parameters, and schemas
4. **Standardize patterns**: Apply consistent conventions for naming, errors, pagination
5. **Generate spec**: Produce the OpenAPI/AsyncAPI document
6. **Validate**: Check spec for completeness and correctness

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Paths | kebab-case, plural nouns | `/api/v1/user-accounts` |
| Query params | camelCase | `?pageSize=20&sortBy=createdAt` |
| Fields | camelCase | `{ "firstName": "Jane" }` |
| Schema names | PascalCase | `UserAccount`, `OrderItem` |
| Enum values | UPPER_SNAKE_CASE | `"ORDER_PENDING"` |

## Standard Error Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable description",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address",
        "code": "INVALID_FORMAT"
      }
    ],
    "requestId": "req_abc123"
  }
}
```

## HTTP Status Code Usage

| Code | Usage |
|------|-------|
| 200 | Successful GET, PUT, PATCH |
| 201 | Successful POST that creates a resource |
| 204 | Successful DELETE with no response body |
| 400 | Validation error or malformed request |
| 401 | Missing or invalid authentication |
| 403 | Authenticated but insufficient permissions |
| 404 | Resource not found |
| 409 | Conflict (duplicate, state violation) |
| 422 | Semantically invalid request |
| 429 | Rate limit exceeded |
| 500 | Unexpected server error |

## Validation Checklist

- [ ] All endpoints have descriptions
- [ ] All request parameters have types and constraints
- [ ] All responses include schema definitions
- [ ] Error responses follow the standard format
- [ ] Collection endpoints support pagination
- [ ] Authentication requirements specified per endpoint
- [ ] Examples provided for request and response bodies
- [ ] No breaking changes from previous spec version (if updating)

## Rules

- Always version the API in the URL path (`/api/v1/...`)
- Use JSON as the default content type
- Include `requestId` in all error responses for traceability
- Define rate limiting headers
- Document all enum values explicitly in the schema
- Prefer `$ref` for reusable schemas over inline definitions
