# Order Management Assessment

## Overview

This project is a simple Order Management application built with ASP.NET Core Web API and React. Users can create new orders and view existing orders through a responsive dashboard.

## Prerequisites

- .NET SDK 8.0
- Node.js (v18+ recommended)
- npm / yarn / pnpm
- dotnet-ef CLI tool (for migrations)

## Tech Stack

### Backend

- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- SQLite

### Frontend

- React
- Vite
- Tailwind CSS
- React Hook Form
- Zod
- Fetch API

## Features

- Retrieve all orders
- Create new orders
- Client-side validation using Zod
- Responsive user interface
- Error handling and HTTP status code responses
- CORS configuration between frontend and backend
- Query optimization using `AsNoTracking()`

## Project Structure

```txt
order-management/
│
├── backend/
│   └── OrderManagement.API/
│
├── frontend/
│   └── order-dashboard/
│
└── README.md
```

## Running the Backend

Navigate to the API project:

```bash
cd backend/OrderManagement.API
```

Restore packages:

```bash
dotnet restore
```

If this is the first time running the project locally, apply migrations to generate the database:

```bash
dotnet ef database update
```

This will create orders.db locally. Do not commit this file, it is ignored by .gitignore.

Run the API:

```bash
dotnet run
```

The API URL will be displayed in the terminal after startup.

## Running the Frontend

Navigate to the React application:

```bash
cd frontend/order-dashboard
```

Install dependencies:

```bash
npm install
```

Create a `.env` file based on `.env.example` and set the API URL:

```env
VITE_API_URL=https://localhost:5001/api/orders
```

Replace the URL with the backend URL shown by `dotnet run` if it differs.

Start the development server:

```bash
npm run dev
```

The application will be available on the URL displayed in the terminal (typically `http://localhost:5173`).

## CORS and Data Flow

The ASP.NET Core API is configured with a CORS policy that allows requests from the React development server. The React frontend uses the Fetch API to communicate with the backend. Orders are retrieved through the GET endpoint and displayed in the dashboard, while new orders are submitted through the POST endpoint without requiring a page reload. Client-side validation is handled using Zod before data is sent to the API.

## Environment Variables

Example `.env.example`:

```env
VITE_API_URL=https://localhost:5001/api/orders
```

Update the value if the backend is running on a different port in your local environment.

## Notes

- Ensure backend is running before starting frontend
- If ports differ, update `VITE_API_URL` in `.env`
- Database file is auto-generated via EF Core migrations
