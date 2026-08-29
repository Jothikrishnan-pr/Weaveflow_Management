# WeaveFlow — Weavers Management System

A full-stack application for managing the operational side of a handloom weaving business: weaver records, loom production tracking, cash advances with interest, and salary settlement — with role-based access control.

**Live demo:** [weaver-project-frontend.onrender.com](https://weaver-project-frontend.onrender.com/)

> Hosted on Render's free tier — the backend sleeps after 15 minutes of inactivity, so the first request after a while can take 30–50 seconds to wake up. Give it a moment on first load.

---

## Table of contents

- [Try it yourself](#try-it-yourself)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [API reference](#api-reference)
- [Getting started locally](#getting-started-locally)
- [Deployment](#deployment)
- [Known limitations](#known-limitations)
- [Roadmap](#roadmap)
- [Author](#author)

---

## Try it yourself

The live demo includes two demo accounts so you can explore without setting anything up:

| Role | Username | Password | Access |
|---|---|---|---|
| **Admin** | `demo_admin` | `admin@123` | Full access — add weavers, looms, advances, payments |
| **Staff** | `demo_staff` | `staff@123` | Day-to-day access — update sarees, view history and search |

Sign in directly from the [landing page's demo section](https://weaver-project-frontend.onrender.com/#demo).

---

## Features

- **Weaver records** — contact details, bank information, and saree specialty in one place
- **Loom tracking** — production batches with a target, completed count, and status that moves itself forward as work is logged
- **Advances with interest** — cash advances accrue monthly interest and are deducted automatically at final settlement
- **Salary settlement** — partial or final payments, with deductions capped so net pay can never go negative
- **Full history** — every loom, payment, and advance for a weaver in one searchable record
- **Role-based access** — JWT authentication with two roles:
  - `STAFF` — day-to-day floor work (log production, view dashboard/history/search)
  - `ADMIN` — everything STAFF can do, plus registering weavers, assigning looms, advances, and payments

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, Axios, plain CSS |
| Backend | Java, Spring Boot 3, Spring Web, Spring Security, Spring Data JPA, JJWT, Bean Validation, Lombok |
| Database | MySQL-compatible, hosted on [TiDB Cloud](https://tidbcloud.com/) |
| Hosting | [Render](https://render.com/) — Web Service (backend, Docker) + Static Site (frontend) |

---

## Architecture

Classic layered Spring Boot backend, with the frontend mirroring it 1:1:

```
React component → Axios (src/api/*.js) → Spring Controller → Service → Repository → MySQL-compatible DB
```

- **Controllers** deserialize the request and delegate — no business logic lives here
- **Services** hold all business logic: validation, calculation, orchestration
- **Repositories** are Spring Data JPA interfaces — SQL is generated from method names
- **JWT auth** — `POST /login` returns a signed token; every subsequent request carries it as `Authorization: Bearer <token>`; `JwtAuthFilter` validates it on every request and `SecurityConfig` enforces role checks per endpoint

---

## Project structure

```
weaver_project/
├── backend/
│   ├── src/main/java/com/weaveflow/weavers_management/
│   │   ├── Controller/     # REST endpoints
│   │   ├── Service/        # Business logic
│   │   ├── Repository/     # Spring Data JPA interfaces
│   │   ├── Entity/         # JPA entities
│   │   ├── dto/            # Request/response DTOs
│   │   ├── Enum/           # Domain enums
│   │   ├── Security/       # JWT + Spring Security config
│   │   └── Exception/      # Global exception handling
│   ├── Dockerfile
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── api/             # One file per backend controller
    │   ├── pages/           # One folder per feature/screen
    │   ├── components/      # Reusable UI (Sidebar, ProtectedRoute, etc.)
    │   ├── context/         # Auth context
    │   ├── layouts/         # Page shell
    │   ├── routes/          # Route table
    │   └── utils/           # Enums mirrored from backend, formatters
    └── package.json
```

---

## API reference

| Controller | Endpoint | Access |
|---|---|---|
| AuthController | `POST /login`, `POST /register` | Public |
| WeaverController | `POST /addWeaver` | ADMIN |
| AddLoomController | `POST weaver/add_loom` | ADMIN |
| AddSareeController | `POST weaver/add_sarees` | ADMIN, STAFF |
| AdvanceController | `POST weaver/add-advance` | ADMIN |
| SalaryController | `POST /weaver/payment` | ADMIN |
| DashBoardController | `GET /home` | ADMIN, STAFF |
| HistoryController | `GET /history/{weaverName}` | ADMIN, STAFF |
| WeaverSearchController | `GET /search/{weaverName}` | ADMIN, STAFF |

---

## Getting started locally

### Prerequisites

- JDK 17+
- Node.js 18+
- A MySQL-compatible database (local MySQL, or a free [TiDB Cloud](https://tidbcloud.com/) / [Aiven](https://aiven.io/) instance)

### Backend

```bash
cd backend
```

Create `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/weavers_management
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
jwt.secret=your-own-random-secret-at-least-32-characters
jwt.expiration-ms=86400000
```

Run the schema SQL in your database, then:

```bash
./mvnw spring-boot:run
```

Runs on `http://localhost:8080` by default.

### Frontend

```bash
cd frontend
npm install
```

Create `.env`:

```
VITE_API_BASE_URL=http://localhost:8080
```

```bash
npm run dev
```

Runs on `http://localhost:5173` by default.

---

## Deployment

Live across three free-tier services:

| Piece | Platform |
|---|---|
| Backend | Render — Web Service, built from a multi-stage `Dockerfile` |
| Frontend | Render — Static Site, `npm run build` output |
| Database | TiDB Cloud — MySQL-wire-protocol compatible |

All runtime configuration (DB credentials, JWT secret, CORS origin) is supplied via environment variables on Render — `application.properties` is gitignored and never committed.

---

## Known limitations

- No update or delete endpoints yet — create and read only
- No pagination on list-returning endpoints
- No automated tests
- No in-app password-change flow for the seeded accounts

---

## Roadmap

- Fix a known null-safety edge case in advance handling before it reaches a final payment
- Enforce existing validation annotations on the weaver registration endpoint
- Add update/delete endpoints
- Add an in-app password-change flow

---

## Author

**Jothikrishnan P R**
[github.com/Jothikrishnan-pr/Weaveflow_Management](https://github.com/Jothikrishnan-pr/Weaveflow_Management)
