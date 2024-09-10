# Push Notification Service

This is a RESTful API service for handling push notifications, built with Express.js and using SQLite as the database.

## Table of Contents

- [Push Notification Service](#push-notification-service)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Database](#database)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- RESTful API for managing push notifications
- SQLite database integration using Sequelize ORM
- CORS enabled for cross-origin requests
- Environment variable support

## Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/push-notification-service.git
   ```

2. Navigate to the project directory:
   ```
   cd push-notification-service
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables:
   ```
   PORT=3000
   DATABASE_URL=sqlite:./database.sqlite
   ```
   Adjust the values as needed.

## Usage

To start the server, run:

```
npm start
```

The server will start on the port specified in your `.env` file.

## API Endpoints

- `GET /`: Hello World response
- `GET /api/*`: Various endpoints for managing push notifications (refer to `./routes/index.js` for specific routes)

## Database

This service uses SQLite as the database, with Sequelize as the ORM. The database will be automatically created and synced when you start the server.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.