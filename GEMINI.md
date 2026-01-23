# GEMINI.md

## Project Overview

This is a front-end for a cultural and creative market e-commerce website. The goal is to provide an online platform for market vendors to sell their products and connect with customers. The application is built with React, TypeScript, and Vite. It uses Tailwind CSS for styling, Zustand for state management, and React Query for data fetching. The application has two main sections: a customer-facing side and a merchant side.

## Building and Running

### Prerequisites

- Node.js (version 16.4 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lawrence565/e-commerce-demo.git
   ```
2. Navigate to the project directory:
   ```bash
   cd e-commerce-demo
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

This will start the Vite development server and you can view the application in your browser at `http://localhost:5173`.

### Building for Production

To build the application for production, run the following command:

```bash
npm run build
```

This will create a `dist` directory with the optimized and bundled files.

### Linting

To check the code for linting errors, run the following command:

```bash
npm run lint
```

## Development Conventions

### Code Style

The project uses ESLint to enforce a consistent code style. The configuration can be found in the `.eslintrc.cjs` file.

### Testing

The project uses Playwright for end-to-end testing and Vitest for unit testing. Test files are located in the `tests` and `src/utils` directories respectively.

### State Management

The project uses Zustand for global state management and React Context for more localized state, such as the shopping cart.

### Data Fetching

The project uses React Query to manage asynchronous data fetching, caching, and state synchronization.

### Routing

The project uses React Router for client-side routing. The routes are defined in `src/App.tsx` and are lazy-loaded for better performance.
