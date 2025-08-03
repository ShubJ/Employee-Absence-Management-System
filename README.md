# Employee Absence Management System

## Description

The Employee Absence Management System (EAMS) is a backend API built using the NestJS framework. It provides functionality for managing employee absence requests, including creating, approving, and rejecting absence requests. The system also includes authentication and authorization mechanisms to ensure secure access to its features.

---

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com) - A progressive Node.js framework for building efficient and scalable server-side applications.
- **Database**: SQLite - Lightweight relational database.
- **ORM**: TypeORM - Object Relational Mapper for database interactions.
- **Authentication**: JWT (JSON Web Token) for secure user authentication.
- **Validation**: Class-validator for validating DTOs.
- **Throttling**: NestJS Throttler for rate-limiting requests.
- **Logging**: Custom request logging interceptor.
- **Error Handling**: Global exception filter for consistent error responses.

---

## Features

### Authentication

- **Login**: Users can log in using their email.
- **Registration**: New users can register with their name, email, and role (Employee/Admin).
- **JWT-based Authentication**: Secure access using bearer tokens.

### Absence Management

- **Create Absence Requests**: Employees can create absence requests with start and end dates and a reason.
- **Approve/Reject Absence Requests**: Admins can approve or reject pending absence requests.
- **View Absence Requests**: Users can view absence requests with pagination and filtering by status.

### User Management

- **Role-based Access Control**: Employees and Admins have different permissions.
- **User Profiles**: Users can view their profile and associated absence requests.

### Additional Features

- **Rate Limiting**: Prevent abuse by limiting the number of requests per minute.
- **Global Error Handling**: Consistent error responses for all endpoints.
- **Request Logging**: Logs all incoming requests and their responses.

---

## Project Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/employee-absence-management-system.git
   cd employee-absence-management-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     NODE_ENV=development
     PORT=3000
     DATABASE_PATH=database.sqlite
     JWT_SECRET=your-secret-key
     JWT_EXPIRATION=3600s
     ```

4. Run database migrations (if needed):
   ```bash
   npm run build
   ```

---

## Running the Project

### Development Mode

Start the server in development mode with hot-reloading:

```bash
npm run start:dev
```

### Production Mode

Build and start the server in production mode:

```bash
npm run build
npm run start:prod
```

---

## API Endpoints

### Authentication

- **POST /auth/login**: Login with email.
- **POST /auth/register**: Register a new user.

### Absences

- **GET /absences**: View all absence requests (Admin only).
- **POST /absences**: Create a new absence request (Employee only).
- **PATCH /absences/:id/approve**: Approve an absence request (Admin only).
- **PATCH /absences/:id/reject**: Reject an absence request (Admin only).

---

## Deployment

For deployment, follow the [NestJS deployment guide](https://docs.nestjs.com/deployment). You can deploy the application on platforms like AWS, Heroku, or Docker.

---

## License

This project is licensed under the MIT License.
