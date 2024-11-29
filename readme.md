# Expiring Resource Project

## Overview
The Expiring Resource Project is designed to manage resources that have a limited lifespan. This project allows users to generate, retrieve, and delete temporary resources that expire after a set duration.

## Features
- A user can share resources (e.g., file links) with others for a set duration.
- The resource becomes inaccessible after it expires.
- The system can efficiently query active and expired resources.

## Installation
To install the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/harjotrance/expiring_resource_project.git
cd expiring_resource_project
npm install
```

## Configuration
Create a `.env` file in the root directory with the following parameters:

```env
DB_URL=mysql://{user}:{password}@localhost:3306/{schema}
DB_DIALECT=mysql
JWT_SECRET={jwt_secret}
```

- `DB_URL`: The connection URL for the MySQL database (replace `{user}`, `{password}`, and `{schema}` with your MySQL credentials).
- `DB_DIALECT`: The dialect of your database, in this case, `mysql`.
- `JWT_SECRET`: The secret key used for signing JWT tokens.

## Database Setup

### 1. Create the Database
Create the database in MySQL using the following SQL command:

```sql
CREATE DATABASE expiring_resource_db;
```

### 2. Run Migrations
We are using Sequelize for migrations. To create the necessary tables in your database, run the following command:

```bash
npx sequelize-cli db:migrate
```

This will generate the required tables, including:
- `Users` (id, name, email, created_at, updated_at)
- `Resources` (id, user_id, resource_url, expiration_time, created_at, updated_at)

### 3. Populate Sample Data (SQL Commands)

You can populate some sample data for users and resources using the following SQL commands:

#### Sample Users Data:
```sql
INSERT INTO Users (name, email, created_at, updated_at)
VALUES
  ('John Doe', 'john.doe@example.com', NOW(), NOW()),
  ('Jane Smith', 'jane.smith@example.com', NOW(), NOW()),
  ('Harjot Singh', 'harjot@test.com', NOW(), NOW());
```

#### Sample Resources Data:
```sql
INSERT INTO Resources (user_id, resource_url, expiration_time, created_at, updated_at)
VALUES
  (1, 'https://example.com/file1.pdf', DATE_ADD(NOW(), INTERVAL 1 DAY), NOW(), NOW()),
  (2, 'https://example.com/file2.pdf', DATE_ADD(NOW(), INTERVAL 2 DAY), NOW(), NOW()),
  (3, 'https://example.com/file3.pdf', DATE_ADD(NOW(), INTERVAL 3 DAY), NOW(), NOW());
```

## Running the Project
To start the project, run:

```bash
npm run dev
```

This will start the development server, and the API will be accessible on the specified port (default is `localhost:3000`).


## Error Handling
- **404 Not Found**: If a resource or user is not found.
- **400 Bad Request**: If there is an invalid request, such as missing parameters.
- **401 Unauthorized**: If access is attempted by a user without proper authorization.