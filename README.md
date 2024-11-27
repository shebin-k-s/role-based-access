---

# Role-Based Access Control (RBAC) System

This project implements a **Role-Based Access Control (RBAC)** system using Node.js, Express, and JWT for authentication and authorization. It includes user registration, login, role-based authorization, and token-based logout.

---

## Features

1. **User Authentication**:
   - User registration, login, and logout.
   - JWT-based authentication with token expiry.

2. **Role-Based Authorization**:
   - Roles: `admin`, `user`, `moderator`.
   - Access to protected routes based on roles.

3. **Protected Routes**:
   - Accessible only with valid tokens.
   - Role-specific access control.

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:shebin-k-s/role-based-access.git
   cd role-based-access
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and include the following:
   ```env
   PORT=port_number
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## Routes

### Authentication Routes (`/auth`)
| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| POST   | `api/v1/auth/register`    | Register a new user            |
| POST   | `api/v1/auth/login`       | Login and get JWT token        |
| POST   | `api/v1/auth/logout`      | Logout and invalidate the token|

### Protected Routes (`/protected`)
| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/api/v1/admin`           | Access admin-protected resources |
| GET    | `/api/v1/moderator`       | Access moderator-protected resources |
| GET    | `/api/v1/user`            | Access user-protected resources |

---

## Middleware

1. **verifyToken**:
   - Validates JWT tokens sent in the `authorization` header.

2. **authorizeRole**:
   - Restricts access based on user roles.

---

## Models

- **User Model**:
  - Fields: `username`, `password`, `role`.
  - Passwords are hashed using `bcrypt`.

---

## Example Usage

### Register a User
**POST** `api/v1/auth/register`
```json
{
  "username": "john",
  "password": "password123",
  "role": "admin"
}
```

### Login
**POST** `api/v1/auth/login`
```json
{
  "username": "john",
  "password": "password123"
}
```
### Logout
**POST** `api/v1/auth/logout`
- Include the following header:
  ```http
  authorization: <your_token>
  ```

### Access Protected Route
**GET** `/api/v1/admin`
- Include the following header:
  ```http
  authorization: <your_token>
  ```

**GET** `/api/v1/moderator`
- Include the following header:
  ```http
  authorization: <your_token>
  ```

**GET** `/api/v1/user`
- Include the following header:
  ```http
  authorization: <your_token>
  ```

---

## Dependencies

- **bcrypt**: For password hashing.
- **cors**: To enable Cross-Origin Resource Sharing.
- **dotenv**: For managing environment variables.
- **express**: Web framework for building the API.
- **jsonwebtoken**: For token-based authentication.
- **mongoose**: MongoDB ORM for schema and database interactions.

---