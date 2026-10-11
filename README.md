# EstatePro — Real Estate Management System

EstatePro is a modern real estate management dashboard designed to simplify property administration and help manage properties, units, tenants, and leases through a clean and responsive interface.

Built with React, TypeScript, NestJS, Prisma, and PostgreSQL, the project follows a feature-based architecture with a focus on maintainability, scalability, and a consistent user experience.

## Screenshots

The following screenshots showcase the EstatePro interface and its main management features.

### Dashboard

![EstatePro Dashboard](./screenshots/sshot-2.png)

### Properties Management

![EstatePro Properties Management](./screenshots/sshot-3.png)

### Units Management

![EstatePro Units Management](./screenshots/sshot-4.png)

### Tenants Management

![EstatePro Tenants Management](./screenshots/tenants.png)

### Leases Management

![EstatePro Leases Management](./screenshots/leases.png)

### Authentication

![EstatePro Login Page](./screenshots/login.png)

## Features

* **Dashboard** — Overview of real estate management activities.
* **Properties Management** — Organize and manage property records.
* **Units Management** — Manage individual units within properties.
* **Tenants Management** — Maintain tenant information.
* **Leases Management** — Organize lease records.
* **Authentication** — Login and registration with access-token-based authentication.
* **Protected Routes** — Restrict dashboard access to authenticated users.
* **Responsive Layout** — Adaptive sidebar, navigation drawer, and header for different screen sizes.
* **Custom 404 Page** — A branded not-found page with navigation back to the dashboard.
* **API Integration** — Communicate with the backend through a centralized Axios client.

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* TanStack Query
* Axios
* Ant Design
* Tailwind CSS
* React Hook Form
* Zod

### Backend

* NestJS
* Prisma ORM
* PostgreSQL

## Project Structure

The application uses a feature-based frontend architecture to keep related functionality organized and maintainable.

```text
EstatePro/
├── frontend/
│   └── src/
│       ├── features/
│       │   └── auth/
│       ├── layouts/
│       ├── pages/
│       │   ├── auth/
│       │   ├── dashboard/
│       │   ├── properties/
│       │   ├── units/
│       │   ├── tenants/
│       │   ├── leases/
│       │   └── not-found/
│       ├── routes/
│       └── services/
│           └── api/
├── backend/
│   ├── prisma/
│   └── src/
└── screenshots/
    ├── dashboard.png
    ├── properties.png
    ├── units.png
    ├── tenants.png
    ├── leases.png
    └── login.png
```

*Note: Adjust the directory structure to match your actual repository.*

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* PostgreSQL
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/komeilyeganeh/real-estate-management.git
cd real-estate-management
```

### 2. Set Up the Frontend

Navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:3001
```

Start the development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

### 3. Set Up the Backend

Open a separate terminal and navigate to the backend directory:

```bash
cd backend
npm install
```

Configure the backend environment variables in a `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/real-estate?schema=public"
```

Replace `USER` and `PASSWORD` with your PostgreSQL credentials and ensure that the database exists.

Generate the Prisma Client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate dev
```

Start the backend development server:

```bash
npm run start:dev
```

The backend is expected to run at:

```text
http://localhost:3001
```

*Note: The backend setup assumes that the required Prisma schema and migrations are already configured. Follow the backend's existing setup if it differs.*

## Authentication

EstatePro includes a basic authentication flow:

* Login and registration interfaces.
* Access-token storage and retrieval.
* Automatic Bearer token attachment to API requests.
* Protected dashboard routes.
* Logout functionality that clears the stored access token.

The current implementation uses browser `localStorage` for access-token storage. This is a simplified approach suitable for a demonstration project, but it is vulnerable to token theft if an attacker can execute JavaScript in the application. A production implementation should consider a stronger session strategy, such as secure, HTTP-only cookies, alongside appropriate server-side protections.

## Responsive Design

The dashboard layout adapts to different screen sizes:

* **Desktop:** Persistent sidebar and full navigation.
* **Tablet:** More compact header and content spacing.
* **Mobile:** Collapsible navigation drawer and adaptive page layout.

The interface uses Tailwind CSS utility classes and Ant Design components to provide a consistent design system.

## Environment Variables

| Variable       | Description                                 |
| -------------- | ------------------------------------------- |
| `VITE_API_URL` | Base URL of the backend API                 |
| `DATABASE_URL` | PostgreSQL connection string used by Prisma |

Do not commit real credentials, private keys, or production environment files to version control.

## Development Scripts

The available scripts depend on each package's `package.json`.

**Frontend**

```bash
npm run dev
npm run build
npm run preview
```

**Backend**

```bash
npm run start:dev
npm run build
npm run start:prod
```

## Future Improvements

Potential next steps include:

* Completing responsive behavior across all data tables and forms.
* Adding pagination, filtering, and sorting.
* Improving form validation and error handling.
* Adding role-based access control.
* Adding automated tests.
* Improving API documentation.
* Introducing production-grade session management.
* Adding deployment configuration and CI/CD.

## Project Status

EstatePro is a portfolio-oriented real estate management application under active development. Core dashboard sections and basic authentication are implemented, while additional refinements and features can be added over time.

## License

No license has been specified yet. Add a `LICENSE` file if you intend to distribute the project under an open-source license.
