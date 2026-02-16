# WTWR (What to Wear): Back End

## Project Overview

This project is a RESTful backend for the WTWR (What to Wear) application. It manages users and clothing items stored in MongoDB through a Node.js and Express server. The API supports creating, reading, deleting items, and liking/unliking clothing items. Error responses are standardized as JSON, and the current sprint uses temporary middleware that sets `req.user._id` with a hardcoded test user ID.

## Tech Stack & Tools

- `Node.js` for the runtime environment
- `Express.js` for routing and HTTP request handling
- `MongoDB` + `Mongoose` for persistence and schema modeling
- `validator` for URL validation in Mongoose schemas
- `ESLint` (Airbnb base config) + `Prettier` for code quality and formatting
- `Nodemon` for local development with auto-reload

## Implemented Functionality

- Users API: create user, get all users, get user by ID
- Clothing items API: create item, get all items, get item by ID, delete item by ID
- Likes API: like and unlike items using `PUT/DELETE /items/:itemId/likes`
- Temporary auth middleware: injects `req.user._id` for ownership/likes operations
- 404 handling for unknown routes and invalid resource subpaths
- Centralized status-code constants and JSON error responses (`400`, `404`, `500`)

## API Routes (Current)

- `/users`
  - `GET /users`
  - `POST /users`
- `/users/:userId`
  - `GET /users/:userId`
- `/items`
  - `GET /items`
  - `POST /items`
- `/items/:itemId`
  - `GET /items/:itemId`
  - `DELETE /items/:itemId`
- `/items/:itemId/likes`
  - `PUT /items/:itemId/likes`
  - `DELETE /items/:itemId/likes`

## Running the Project

- `npm run start` — run the server
- `npm run dev` — run the server with `nodemon` (hot reload)
- `npm run lint` — run ESLint checks
