# NestJS-Sessions

## Description

[NestJS](https://github.com/nestjs/nest) user registration, session-based authentication and role-based authorization.

## Technology stack

- TypeScript
- NestJS
- Prisma
- express-session
- bcrypt
- class-transformer and class-validator

<h1 id="err-response-body">Error response body</h1>

When something went wrong, API returns error with body structure below. Only the `POST /api/users` endpoint is not affected.

```typescript
{
  statusCode: number;
  message: string;
  error: string;
}
```

- `statusCode` - error status code (e.g. `403`)
- `message` - error message (e.g. `Forbidden resource`)
- `error` - error name (e.g. `Forbidden`)

# Endpoints

Global endpoint prefix is set to `/api`.

## users

---

```http
POST /api/users
```

body:

```typescript
{
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}
```

Creates new user. If user with given username or email already exists, it returns `409 Conflict` error:

```typescript
{
  username?: 'User with this username already exists.';
  email?: 'User with this email already exists.';
}
```

Otherwise it returns `201 Created` with empty body.

---

```http
GET /api/users/me
```

Returns currently authenticated user. If user is not authenticated it returns `403 Forbidden` with <a href="#err-response-body">error response body</a>. Otherwise it returns `200 OK` with body structure below:

```typescript
{
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  roles: string[];
}
```

## sessions

---

```http
POST /api/sessions
```

body:

```typescript
{
  login: string;
  password: string;
}
```

`login` value can be either username or email (it doesn't matter). If login or password is incorrect, it returns `401 Unauthorized` error with <a href="#err-response-body">error response body</a> and message `Invalid username, email or password.` Otherwise it creates new session on server and returns `201 Created` with session id in cookie `session_id` and empty body.

---

```http
DELETE /api/sessions
```

Deletes session on server. If something went wrong it returns `500 Internal Server Error` error with <a href="#err-response-body">error response body</a> and message `Failed to destroy session.`. Otherwise it returns `200 OK` with empty body.

## License

MIT License, see [LICENSE](LICENSE).
