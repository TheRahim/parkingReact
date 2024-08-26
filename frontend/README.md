# Parking app frontend

Built with React, uses Vite as the bundler. 

**State Management**: Application state is handled within components.

**CSS**: CSS is vanilla and imported in components. Note that it is not scoped so be careful with naming conventions.

## Structure

### src/components
Includes universal shared components for the app

### src/services
Includes services and utility functions for the app. For example, contains the API service used to call the backend.

### src/views
Includes the views of the app. Contains subdirectories for each sub-route.

### src/router
Uses React Router to explicitly define routes. Note that some route handlers contain calls to the API. The data is accessed via the `useLoaderData` hook.

## Environment variables
- VITE_API_URL is the base URL of the API. In dev mode, it defaults to `http://localhost:3000`. In production it defaults to `/api`