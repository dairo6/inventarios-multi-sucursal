# 📘 SYSTEM DOCUMENTATION

## 1. Project Information

- Project Name: Inventario Multi Sucursal (IMS)
- Student Name: [Dairo Alfonso Arcia Macea]
- Course: [Desarrollo Web]
- Semester: [8vo]
- Date: [21/11/2025]
- Instructor: [Jaider Quintero]

Short Project Description:
This project is a multi-branch inventory management system. The application allows administrators to manage products, categories, warehouses, branches, stock movements, lots and user roles. The backend is implemented with Node.js, Express and Sequelize (supporting several DB engines). The frontend is a modern single-page app built with Angular 20, PrimeNG and Tailwind CSS.

---

## 2. System Architecture Overview

### 2.1 Architecture Description

IMS is a typical two-tier web application with a RESTful API backend and a single-page frontend. The backend exposes REST endpoints under `/api` (and some non-prefixed routes for legacy or convenience). It uses Sequelize ORM to map models to a relational database (MySQL/Postgres/MSSQL/Oracle supported). The frontend is an Angular application that consumes the backend API, provides authentication, role-based UI and CRUD screens for each domain model.

Key architectural elements:
- Client (Angular): UI components, services, route guards, HTTP interceptors and state in localStorage.
- Server (Node + Express): controllers, routes, middleware (auth), models (Sequelize) and DB connection.
- Database: relational database (MySQL recommended for local dev) managed by Sequelize.
- Authentication: JWT access tokens and refresh-token persistence in DB.

### 2.2 Technologies Used

- Frontend: Angular 20, TypeScript, PrimeNG (UI components), PrimeUI theme (@primeuix/themes), Tailwind CSS
- Backend: Node.js, TypeScript, Express.js, Sequelize ORM
- Database Engine: MySQL (default), Postgres, MSSQL or Oracle supported (configured by `DB_ENGINE` env var)
- Additional Libraries / Tools: jsonwebtoken, bcryptjs, dotenv, nodemon, ts-node, mysql2/pg/tedious/oracledb

### 2.3 Visual explanation of the system’s operation

![System operation screenshot](./Anexos/system-operation.png)


---

## 3. Database Documentation (ENGLISH)

### 3.1 Database Description

The database stores the application entities such as users, roles and their assignments (role_users), products, categories, suppliers, branches, warehouses, locations and inventory movements. Each domain model uses a table with `status`/`is_active` fields to allow soft deletes or active/inactive filtering.

### 3.2 ERD – Entity Relationship Diagram

Below is a simplified ASCII ERD showing principal relations:

![Entity Relationship Diagram](./Anexos/Entity-Relationship-Diagram.png)



### 3.3 Logical Model

Below are the domain models with their main attributes, types, validations and relationships as implemented in the backend (Sequelize models).

- User
	- Columns: `id`, `username` (string, required), `email` (string, required, unique), `password` (string, required, hashed via hook), `is_active` (enum: `ACTIVE|INACTIVE`, default `ACTIVE`), `avatar` (string, nullable)
	- Timestamps: none (timestamps: false)
	- Hooks: `beforeCreate` / `beforeUpdate` hashes the password using bcrypt.
	- Relations: User.hasMany(RefreshToken), User.hasMany(RoleUser)

- Role
	- Columns: `id`, `name` (string, required), `is_active` (enum: `ACTIVE|INACTIVE`, default `ACTIVE`)
	- Timestamps: none
	- Relations: Role.hasMany(RoleUser)

- RoleUser (assignment)
	- Columns: `id`, `user_id` (FK -> users.id), `role_id` (FK -> roles.id), `is_active` (enum: `ACTIVE|INACTIVE`, default `ACTIVE`)
	- Purpose: represent the active assignment of a role to a user; controller logic updates existing active assignment or creates a new one.

- RefreshToken
	- Columns: `id`, `user_id` (FK -> users.id), `token` (string), `device_info` (string), `is_valid` (enum: `ACTIVE|INACTIVE`, default `ACTIVE`), `expires_at` (date), `created_at`, `updated_at`
	- Timestamps: stored manually via hooks (created_at/updated_at fields exist)
	- Relations: RefreshToken.belongsTo(User)

- Category
	- Columns: `id`, `name` (string, required), `description` (string, nullable), `status` (enum `ACTIVE|INACTIVE`, default `ACTIVE`)
	- Timestamps: none
	- Relations: Category.hasMany(Product)

- Supplier
	- Columns: `id`, `name` (string, required), `taxId` (string, required, unique), `contactName` (string, nullable), `phone` (string, nullable), `email` (string, nullable, unique), `address` (string, nullable), `status` (enum `ACTIVE|INACTIVE`, default `ACTIVE`)
	- Timestamps: createdAt, updatedAt (timestamps: true)
	- Relations: Supplier.hasMany(Product)

- Product
	- Columns: `id`, `name` (string, required), `code` (string, required, unique), `description` (text, nullable), `price` (decimal, required), `quantity` (integer, required), `unit` (string, required), `category_id` (FK -> categories.id), `supplier_id` (FK -> suppliers.id, nullable), `status` (enum `ACTIVE|INACTIVE`, default `ACTIVE`)
	- Timestamps: none
	- Relations: Product.belongsTo(Category), Product.belongsTo(Supplier), Product.hasMany(Lot), Product.hasMany(InventoryMovement), Product.hasMany(StockBranch), Product.hasOne(Guarantee)

- Lot
	- Columns: `id`, `product_id` (FK -> products.id), `code` (string, unique), `expirationDate` (date, nullable), `quantity` (integer, default 0), `status` (enum `AVAILABLE|EXPIRED|BLOCKED`, default `AVAILABLE`), `createdAt` (date)
	- Timestamps: only `createdAt` (updatedAt disabled)
	- Relations: Lot.belongsTo(Product), Lot.hasMany(InventoryMovement)

- InventoryMovement
	- Columns: `id`, `product_id` (FK), `warehouse_id` (FK), `lot_id` (FK, optional), `movementType` (enum `IN|OUT|TRANSFER`), `quantity` (int), `reference` (string, optional), `status` (enum `ACTIVE|INACTIVE`, default `ACTIVE`), `createdAt` (date)
	- Timestamps: createdAt stored, timestamps: false
	- Relations: InventoryMovement.belongsTo(Product), InventoryMovement.belongsTo(Warehouse), InventoryMovement.belongsTo(Lot)

- Branch
	- Columns: `id`, `name` (string, required), `code` (string, required, unique), `address` (string, required), `phone` (string, nullable), `email` (string, nullable, unique), `status` (enum `ACTIVE|INACTIVE`, default `ACTIVE`)
	- Timestamps: createdAt, updatedAt (timestamps: true)
	- Relations: Branch.hasMany(Warehouse), Branch.hasMany(StockBranch)

- Warehouse
	- Columns: `id`, `branch_id` (FK -> branches.id), `name` (string, required), `code` (string, required, unique), `description` (string, nullable), `status` (enum `ACTIVE|INACTIVE`, default `ACTIVE`)
	- Timestamps: createdAt, updatedAt (timestamps: true)
	- Relations: Warehouse.belongsTo(Branch), Warehouse.hasMany(Location), Warehouse.hasMany(InventoryMovement)

- Location
	- Columns: `id`, `warehouse_id` (FK -> warehouses.id), `code` (string, unique, required), `description` (string, nullable), `status` (enum `AVAILABLE|OCCUPIED|BLOCKED`, default `AVAILABLE`)
	- Timestamps: none
	- Relations: Location.belongsTo(Warehouse)

- StockBranch
	- Columns: `id`, `branch_id` (FK -> branches.id), `product_id` (FK -> products.id), `quantity` (int, default 0), `minStock` (int), `maxStock` (int), `status` (enum `ACTIVE|INACTIVE`, default `ACTIVE`), `updatedAt` (date)
	- Timestamps: only `updatedAt` (createdAt disabled)
	- Relations: StockBranch.belongsTo(Branch), StockBranch.belongsTo(Product)

- Guarantee
	- Columns: `id`, `product_id` (FK -> products.id, optional, unique — 1:1), `description` (string), `durationMonths` (int), `terms` (text, optional), `status` (enum `ACTIVE|EXPIRED`, default `ACTIVE`), `createdAt` (date)
	- Timestamps: only `createdAt` (updatedAt disabled)
	- Relations: Guarantee.belongsTo(Product) and Product.hasOne(Guarantee)

Notes:
- Many models use ENUM types for statuses; default values typically set to `ACTIVE` or an equivalent.
- Hooks and timestamp choices are intentional (e.g., `User` password hashing; `Lot` keeps only `createdAt`; `StockBranch` maintains `updatedAt`).


### 3.4 Physical Model (Tables)

| Table                | Column (examples)                                              | Type                    | PK / FK                                | Description |
|---------------------:|:---------------------------------------------------------------|:------------------------|:---------------------------------------:|:------------|
| `users`              | `id`, `username`, `email`, `password`, `is_active`, `avatar`   | INT, VARCHAR, VARCHAR, ENUM | PK                                     | Application users (passwords hashed via hooks)
| `roles`              | `id`, `name`, `is_active`                                      | INT, VARCHAR, ENUM      | PK                                     | Roles for RBAC
| `role_users`         | `id`, `user_id`, `role_id`, `is_active`                        | INT, INT, INT, ENUM     | FK -> `users(id)`, `roles(id)`         | Active role assignments for users
| `refresh_tokens`     | `id`, `user_id`, `token`, `device_info`, `expires_at`, `is_valid` | INT, INT, VARCHAR, VARCHAR, DATETIME, ENUM | FK -> `users(id)`               | Persisted refresh tokens for sessions
| `resources`          | `id`, `name`, `path`, `method`, `is_active`                    | INT, VARCHAR, VARCHAR, VARCHAR, ENUM | PK                                     | API resources for RBAC (URI + method)
| `resource_roles`     | `id`, `resource_id`, `role_id`, `permissions`                  | INT, INT, INT, VARCHAR  | FK -> `resources(id)`, `roles(id)`    | Maps resources to roles and permissions
| `categories`         | `id`, `name`, `description`, `status`                          | INT, VARCHAR, TEXT, ENUM| PK                                     | Product categories
| `suppliers`          | `id`, `name`, `taxId`, `contactName`, `phone`, `email`, `address`, `status` | INT, VARCHAR, VARCHAR, VARCHAR, VARCHAR, VARCHAR, VARCHAR, ENUM | PK | Product suppliers and contacts
| `products`           | `id`, `name`, `code`, `description`, `price`, `quantity`, `unit`, `category_id`, `supplier_id`, `status` | INT, VARCHAR, VARCHAR, TEXT, DECIMAL, INT, VARCHAR, INT, INT, ENUM | FK -> `categories(id)`, `suppliers(id)` | Product catalog
| `lots`               | `id`, `product_id`, `code`, `expiration_date`, `quantity`, `status`, `created_at` | INT, INT, VARCHAR, DATETIME, INT, ENUM, DATETIME | FK -> `products(id)` | Product lots / batches
| `branches`           | `id`, `name`, `code`, `address`, `phone`, `email`, `status`, `created_at`, `updated_at` | INT, VARCHAR, VARCHAR, VARCHAR, VARCHAR, VARCHAR, ENUM, DATETIME, DATETIME | PK | Company branches
| `warehouses`         | `id`, `branch_id`, `name`, `code`, `description`, `status`, `created_at`, `updated_at` | INT, INT, VARCHAR, VARCHAR, TEXT, ENUM, DATETIME, DATETIME | FK -> `branches(id)` | Warehouses linked to branches
| `locations`          | `id`, `warehouse_id`, `code`, `description`, `status`         | INT, INT, VARCHAR, TEXT, ENUM | FK -> `warehouses(id)`                  | Storage locations inside warehouses
| `inventory_movements`| `id`, `product_id`, `warehouse_id`, `lot_id`, `movement_type`, `quantity`, `reference`, `status`, `created_at` | INT, INT, INT, INT, ENUM, INT, VARCHAR, ENUM, DATETIME | FK -> `products(id)`, `warehouses(id)`, `lots(id)` | Records of stock moves (IN/OUT/TRANSFER)
| `stock_branch`       | `id`, `branch_id`, `product_id`, `quantity`, `min_stock`, `max_stock`, `status`, `updated_at` | INT, INT, INT, INT, INT, INT, ENUM, DATETIME | FK -> `branches(id)`, `products(id)` | Stock per branch
| `guarantees`         | `id`, `product_id`, `description`, `duration_months`, `terms`, `status`, `created_at` | INT, INT, TEXT, INT, TEXT, ENUM, DATETIME | FK -> `products(id)`                   | Product guarantee / warranty (1:1 with product optional)

Notes: 
- Types are given generically for cross-DB compatibility — replace `INT`, `VARCHAR`, `DECIMAL`, `DATETIME`, `TEXT`, `ENUM` with engine-specific types where needed.
- PK = primary key. FK entries indicate foreign key references (example: `FK -> branches(id)`).
- Tables that set `timestamps: true` in Sequelize include `created_at` and `updated_at` (e.g., `branches`, `warehouses`, `suppliers`), while others intentionally omit timestamps (e.g., `users` may use custom hooks).

If you want, I can also generate a SQL `CREATE TABLE` sketch for each table (compatible with MySQL) or add explicit constraints (UNIQUE, NOT NULL) in this table. 

---

## 4. Use Cases – CRUD (generic examples)

The following use cases describe the typical CRUD operations supported by the system. Use cases are written in an implementation-agnostic style.

### 4.1 Use Case: Create Product

Actor: Administrator
Description: Admin creates a new product in the catalog and associates it with a category and (optionally) a supplier.
Preconditions: Admin is authenticated and has permission to create products.
Postconditions: Product row is created with `status = 'ACTIVE'` and is visible in product lists.
Main Flow:
1. Admin navigates to product creation page in Angular UI.
2. Admin fills product form (name, code, price, qty, unit, category, supplier).
3. Frontend calls `POST /api/productos` (or `/productos`) with product payload.
4. Backend validates data and calls Sequelize `Product.create()`.
5. Backend returns 201 Created with product data.
6. Frontend refreshes product list and shows confirmation.

### 4.2 Use Case: Read Products

Actor: Any authenticated user (or public if API permits)
Description: Retrieve product catalog with categories and supplier info.
Main Flow:
1. Frontend calls `GET /api/productos`.
2. Backend returns JSON array of products (filtered by `status='ACTIVE'`).
3. UI displays paginated table.

### 4.3 Use Case: Update Product

Actor: Admin
Description: Update product details such as price or stock quantity.
Main Flow:
1. Admin opens update form for selected product.
2. Frontend sends `PATCH /api/productos/:id` with modified fields.
3. Backend updates record via Sequelize and returns 200 OK.

### 4.4 Use Case: Delete Product (logical)

Actor: Admin
Description: Mark product as inactive.
Main Flow:
1. Admin clicks delete.
2. Frontend calls `DELETE /api/productos/:id/logic` (or the delete endpoint).
3. Backend sets `status='INACTIVE'` or performs a soft delete.

---

## 5. Backend Documentation

### 5.1 Backend Architecture

The backend is organized by domain: controllers (handle HTTP), models (Sequelize), routes (route definitions) and middleware (auth). The `App` bootstrapper loads routes and database connection.

Request flow:
- Express route -> Controller method -> Sequelize model -> DB
- Authentication middleware (`authMiddleware`) verifies JWT and checks role-based permissions using `Resource`, `ResourceRole`, `RoleUser`, and `Role` tables.

### 5.2 Folder Structure

![Folder Structure](./Anexos/Folder-Structure.png)



### 5.3 API Documentation (REST) — Selected Endpoints

Base URL: `http://localhost:3000` (configured in frontend service)

- POST `/api/login` — Login
	- Body: `{ "email": "user@example.com", "password": "secret" }`
	- Responses: `200 OK` { user, token, refreshToken } or `401` invalid credentials

- GET `/api/users` — List users
	- Responses: `200 OK` { users: [...] }

- PUT `/api/users/:userId/roles` — Assign/Update role for user (protected)
	- Headers: `Authorization: Bearer <token>`
	- Body: `{ "roleId": 2 }`
	- Responses: `200 OK` (updated) or `201 Created` (new assignment)

- GET `/api/productos` — List products (public or protected)
	- Responses: `200 OK` array of products

- POST `/api/productos` — Create product (protected)
	- Body: product fields (name, code, price, category_id, quantity, unit,...)

Note: The code includes both non-prefixed routes (e.g., `/productos`) and `/api/...` prefixed versions guarded by `authMiddleware`.

### 5.4 REST Client (Postman / Insomnia)

Use Postman or Insomnia to test endpoints. Example sequence to test protected endpoints:
1. POST `/api/login` -> obtain `token`
2. Add `Authorization: Bearer <token>` header for subsequent requests
3. PUT `/api/users/:id/roles` with `{ roleId: X }`

#### Using VSCode REST Client (.http files)

We included ready-to-run `.http` files under `ims-backend/src/http/` for quick testing with the VSCode extension "REST Client". Typical workflow:

- Install the **REST Client** extension in VSCode.
- Open one of the `.http` files (for example `ims-backend/src/http/authorization/auth.http`).
- Place the cursor on a request and click the `Send Request` button that appears above the request to execute it.
- For protected endpoints: first run the `POST /api/login` request, copy the returned JWT from the JSON response (the field named `token` or `accessToken` depending on the response), then add an `Authorization` header to subsequent requests:

```
Authorization: Bearer <paste-your-token-here>
```

- Optional: create a REST Client environment file to store base URLs or placeholders (`.vscode/rest-client.env.json`) and use `{{variable}}` in `.http` files. Example environment file:

```
{
	"local": {
		"baseUrl": "http://localhost:3000"
	}
}
```

And use in requests:

```
GET {{baseUrl}}/api/users
Authorization: Bearer <your-token>
```

Notes (español): usamos la carpeta `src/http/` para agrupar las requests que probamos con REST Client. Ejecuta primero el login, copia el token y pégalo en la cabecera `Authorization` de las peticiones protegidas.

---

## 6. Frontend Documentation

### 6.1 Technical Frontend Documentation

Framework Used: Angular 20 (Standalone components)

Folder Structure (selected):

![Folder Structure Frontend](./Anexos/Folder-Estructure-Frontend.png)

Models, Services and Components (detailed)

Frontend (Angular - `ims-frontend/src/app`)

- Components (folder: `src/app/components`)
	- `auth/`
		- `list-user/` (users list + assign-role dialog)
		- `login/`
		- `register/`
	- `product/` (product list, create/edit forms)
	- `category/`
	- `supplier/`
	- `branch/`
	- `warehouse/`
	- `location/`
	- `lot/`
	- `inventory-movement/`
	- `stock-branch/`
	- `guarantee/`
	- `layout/` (app layout, aside, header, footer)
	- `ui/` (shared UI pieces, home)

- Services (folder: `src/app/services`)
	- `auth.ts` — auth endpoints and user/role helpers: `login`, `register`, `getAllUsers`, `getAllRoles`, `assignRoleToUser`, etc.
	- `product.ts` — product CRUD calls
	- `category.ts` — category CRUD calls
	- `supplier.ts` — supplier CRUD calls
	- `branch.ts` — branch CRUD calls
	- `warehouse.ts` — warehouse CRUD calls
	- `location.ts` — location CRUD calls
	- `lot.ts` — lot CRUD calls
	- `inventory-movement.ts` — inventory movement endpoints
	- `stock-branch.ts` — stock per branch endpoints
	- `guarantee.ts` — guarantee endpoints
	- (each service has a corresponding `*.spec.ts` test file scaffold)

- Interceptors (folder: `src/app/interceptors`)
	- `auth.interceptor.ts` — attaches `Authorization: Bearer <token>` header to outgoing HTTP requests (reads token from `localStorage`).

Backend (Node + Sequelize - `ims-backend/src/models`)

- Domain models (files under `ims-backend/src/models`):
	- `product.ts`
	- `category.ts`
	- `supplier.ts`
	- `branch.ts`
	- `warehouse.ts`
	- `location.ts`
	- `lot.ts`
	- `inventorymovement.ts`
	- `stockbranch.ts`
	- `guarantee.ts`

- Authorization models (folder: `ims-backend/src/models/authorization`):
	- `user.ts`
	- `role.ts`
	- `role_user.ts`
	- `resource.ts`
	- `resource_role.ts`
	- `refresh_token.ts`

Notes:
- The frontend components map closely to backend controllers and routes (e.g., `product` component ↔ `product.controller.ts` + `product` routes).
- Services encapsulate the HTTP API calls; `auth.ts` is the main service that also interacts with role/user endpoints.
- If you want, I can expand each bullet with file paths and primary methods (e.g., list of exported functions) or add a cross-reference table mapping component → service → backend route.


### 6.2 Visual explanation of the system’s operation (frontend)

1. User opens the app in browser (Angular served by `ng serve`).
2. Login component posts credentials to `/api/login`.
3. Successful login stores user and token in `localStorage`.
4. User navigates to CRUD screens where Angular services call backend endpoints.
5. UI updates based on responses and shows modals (PrimeNG) for create/update operations.

![alt text](<./Anexos/Captura de pantalla 2025-11-19 014025.png>)

![alt text](./Anexos/Local-storade.png)

![alt text](<./Anexos/Captura de pantalla 2025-11-19 234247.png>)

---

## 7. Frontend–Backend Integration

Integration points and important details:
- Base API URL is `http://localhost:3000/api` (check `AuthService.baseUrl`).
- The frontend uses `AuthInterceptor` to attach the JWT `Authorization` header. Ensure token exists in localStorage (`auth_token`) after login.
- Routes protected by `authMiddleware` require a valid JWT. The backend `authMiddleware` validates the token and checks permissions using `Resource`/`ResourceRole` tables.
- When assigning a role from `list-user` component, the frontend calls `PUT /api/users/:userId/roles` with body `{ roleId }`.
- The backend uses `RoleUser` table to store role assignments, updating the existing active assignment or creating a new one.

Example HTTP flow for role assignment:

1. Frontend: `PUT http://localhost:3000/api/users/5/roles` body `{ "roleId": 2 }` (with Authorization header)
2. Backend: verifies token -> controller `assignRoleToUser` -> updates or creates `role_users` record -> returns 200/201
3. Frontend: on success, reloads users list and closes modal.

---

## 8. Conclusions & Recommendations

Conclusions:
- The project follows a clear separation of concerns between frontend and backend. The use of Sequelize makes it flexible to change database engines during deployment.
- The authentication approach (JWT + refresh token) is appropriate for SPA scenarios.

Recommendations:
1. Add input validation and stronger error messages on the frontend for each form.
2. Add request/response logging and central error handler for backend to ease debugging in production.
3. Create a small migration seed script to populate initial roles and an admin user.
4. Add unit and integration tests for critical endpoints (auth, role assignment, product CRUD).
5. Consider adding pagination for `GET /api/productos` and role-based UI restrictions in the frontend to hide admin-only actions.

---

## 9. Annexes (Optional)

### 9.1 Run & Dev commands

Backend (development):
```bash
cd ims-backend
npm install
npm run dev    # runs nodemon + ts-node
```

Frontend (development):
```bash
cd ims-frontend
npm install
npm start      # runs ng serve
```

### 9.2 Environment variables (example `.env`)

```dotenv
# Actual `.env` utilizado en el backend (ruta: `ims-backend/.env`)
PORT=3000

# Variable para seleccionar el motor de base de datos   postgres  mysql
DB_ENGINE=postgres

# Configuración para MySQL
MYSQL_HOST=localhost
MYSQL_USER=dairo
MYSQL_PASSWORD=Dairo@123
MYSQL_NAME=inventarios_multi_sucursal
MYSQL_PORT=3306

# Configuración para PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=root
POSTGRES_NAME=inventarios_multi_sucursal
POSTGRES_PORT=5432

# Configuración para SQL Server
MSSQL_HOST=localhost
MSSQL_USER=sa
MSSQL_PASSWORD=Dairo@123    
MSSQL_NAME=inventarios_multi_sucursal
MSSQL_PORT=1433

# Configuración para Oracle
ORACLE_HOST=localhost
ORACLE_USER=inventarios_multi_sucursal
ORACLE_PASSWORD=Dairo@123
ORACLE_NAME=xe
ORACLE_PORT=1521

# JWT Secret
JWT_SECRET=DarciaSuperSecretKey123
```

### 9.3 Quick test (REST Client / Postman)

We primarily use the **VSCode REST Client** with the `.http` files included under `ims-backend/src/http/` for quick API checks, but the same sequence works in Postman or Insomnia.

Quick steps using REST Client (`.http` files):
1. Open `ims-backend/src/http/authorization/auth.http` and run the `POST /api/login` request to obtain a token.
2. Copy the returned token (`token` or `accessToken` in the JSON response).
3. Open the appropriate `.http` (for example `ims-backend/src/http/authorization/user.http`) and add the header line before protected requests:

```
Authorization: Bearer <paste-your-token-here>
```

4. Run `PUT /api/users/:id/roles` with body `{ "roleId": X }` to assign/update a role for a user.
5. Run `GET /api/users` to verify the assignment.

Notes for Postman/Insomnia: follow the same sequence — run login, copy the token and add an `Authorization: Bearer <token>` header for subsequent requests.

Tip: create a REST Client environment (e.g. `.vscode/rest-client.env.json`) with `baseUrl` so requests use `{{baseUrl}}` and you don't need to edit each file when changing the host.

