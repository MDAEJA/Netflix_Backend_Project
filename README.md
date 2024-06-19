# Movie App

## Description

A simple movie application that allows users to search for movies, view movie details, and manage user accounts with authentication features.

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local or cloud-based)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/movie-app.git
    cd movie-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables:
    - Create a `.env` file in the root directory
    - Add the following environment variables:
    ```
    PORT=5000
    SECRET_KEY=your_jwt_secret
    MONGO_URI=your_mongo_connection_string
    ```

## Running the Application

1. Start the server:
    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:5000`.

## API Endpoints

### Create Account
- URL: `/create`
- Method: `POST`
- Body:
    ```json
    {
      "userName": "string",
      "email": "string",
      "password": "string"
    }
    ```

### Login
- URL: `/user`
- Method: `POST`
- Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

### Logout
- URL: `/userlogout`
- Method: `GET`

## Usage Example

### Creating a New Account

```bash
curl -X POST http://localhost:5000/create -H "Content-Type: application/json" -d '{
  "userName": "JohnDoe",
  "email": "john@example.com",
  "password": "Password123!"
}'
