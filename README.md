# Employee Management System (EMS)

A comprehensive Employee Management System built using the MERN stack, designed to streamline employee, department, leave, and salary management for organizations.

## Overview

The Employee Management System provides separate dashboards for Admins and Employees to manage essential organizational tasks. The project showcases a robust and feature-rich application with key functionalities for both roles, including authentication, dashboards, and management modules.

## Features

### Admin Features

- **Authentication**: Secure login functionality with role-based access control.
- **Dashboard Overview**:
  - Total employees and departments.
  - Monthly payroll overview.
  - Leave application statistics (pending, approved, rejected).
- **Employee Management**:
  - Add, edit, view, and search employees.
  - Manage employee details, salaries, and leaves.
- **Department Management**:
  - Add, edit, delete, and search departments.
- **Leave Management**:
  - View, approve, or reject employee leave requests.
- **Salary Management**:
  - Define salaries, allowances, deductions, and pay dates for employees.
- **Settings**:
  - Change admin password.

### Employee Features

- **Dashboard Overview**: Welcome message and personal stats.
- **Profile Management**: View personal details.
- **Leave Management**:
  - Request leave with type, duration, and description.
  - View leave history and statuses.
- **Salary History**: View detailed salary records.
- **Settings**: Change password securely.

## Technologies Used

- **Frontend**: React, TailwindCSS, styled-components, axios, React Router, Vite.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB.
- **Authentication & Security**: JWT, bcrypt.
- **Other Tools & Packages**:
  - Multer for file uploads.
  - Nodemon for automatic server refreshes.
  - CORS for Cross-Origin Resource Sharing.

## Installation & Setup

### Frontend Setup

Clone the repository and navigate to the frontend directory:

```bash
cd EMS_FrontEnd
```

Install dependencies:

```bash
npm install
```

Configure TailwindCSS:

```bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init
```

Start the development server:

```bash
npm run dev
```

### Backend Setup

Navigate to the backend directory and initialize the project:

```bash
cd EMS_BackEnd
npm init -y
```

Install dependencies:

```bash
npm install bcrypt cors express jsonwebtoken mongoose multer nodemon path
```

Create a `.env` file for environment variables:

```plaintext
PORT=<your-port>
MONGO_URI=<your-mongo-db-uri>
JWT_SECRET=<your-jwt-secret>
```

Add scripts to `package.json`:

```json
"type": "module",
"start": "nodemon index.js"
```

Start the backend server:

```bash
npm start
```

## Project Structure

### Frontend

- `src/Assets`: Static files and CSS.
- `src/Pages`: Pages for Admin, Employee, and Login.
- `src/Components`: Reusable components like NavBar and Sidebar.
- `src/Utils`: Helper functions and utilities.

### Backend

- `index.js`: Entry point of the Node.js application.
- **Environment Variables**: Tokens, keys, and URLs stored securely in `.env`.

## Usage

### Login

Use admin or employee credentials to log in. Admins access the Admin Dashboard, while employees access the Employee Dashboard.

### Admin Workflow

- Manage employees, departments, leaves, and salaries via the Admin Dashboard.
- Monitor organizational stats on the dashboard overview.

### Employee Workflow

- View profile, salary details, and leave history.
- Submit leave requests and track their status.

## Contributing

1.  Fork the repository.
2.  Create a feature branch:

        ```bash
        git checkout -b feature-name
        ```

3.  Commit your changes:

        ```bash
        git commit -m "Add your message"
        ```

4.  Push the branch and create a pull request.

## License

This project is open-source and available under the MIT License.
