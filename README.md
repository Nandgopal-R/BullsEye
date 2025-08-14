# Bullseye

Bullseye is a web application that provides real-time stock information. It features a user-friendly interface to search for companies, view stock details, and visualize historical stock data.

## Features

*   **Company Search:** Search for companies and view their stock information.
*   **Stock Details:** Get detailed stock information, including price, volume, and historical data.
*   **Interactive Charts:** Visualize historical stock data with interactive charts.
*   **Real-time Data:** Fetches real-time stock data from Yahoo Finance.

## Tech Stack

### Frontend

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool for modern web projects.
*   **TypeScript:** A typed superset of JavaScript.
*   **Tailwind CSS:** A utility-first CSS framework.
*   **shadcn/ui:** A collection of re-usable components for React.
*   **Recharts:** A composable charting library built on React components.

### Backend

*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express:** A fast, unopinionated, minimalist web framework for Node.js.
*   **Prisma:** A next-generation ORM for Node.js and TypeScript.
*   **PostgreSQL:** A powerful, open source object-relational database system.
*   **Yahoo Finance API:** Used to fetch real-time stock data.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   npm
*   PostgreSQL

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/bullseye.git
    ```
2.  **Backend Setup**
    *   Navigate to the `backend` directory:
        ```sh
        cd backend
        ```
    *   Install NPM packages:
        ```sh
        npm install
        ```
    *   Set up your `.env` file by copying the example:
        ```sh
        cp .env.example .env
        ```
    *   Add your PostgreSQL connection string to the `.env` file:
        ```
        DATABASE_URL="postgresql://user:password@host:port/database"
        ```
    *   Run database migrations:
        ```sh
        npm run prisma:migrate
        ```
    *   Start the backend server:
        ```sh
        npm run dev
        ```
3.  **Frontend Setup**
    *   Navigate to the `frontend` directory:
        ```sh
        cd frontend
        ```
    *   Install NPM packages:
        ```sh
        npm install
        ```
    *   Start the frontend development server:
        ```sh
        npm run dev
        ```

## API Endpoints

The following API endpoints are available:

*   `GET /api/companies`: Get a list of all companies.
*   `GET /api/stock-details?symbol=<stock_symbol>`: Get stock details for a specific company.
