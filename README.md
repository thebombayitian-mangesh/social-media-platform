# Social Media Microservices Platform

A distributed Social Media Platform built using **Java, Spring Boot, Spring Cloud, React and PostgreSQL**. The application follows a microservices architecture with **Eureka Service Discovery** and an **API Gateway**.

## Project Overview

This project is a microservices-based social media platform that provides core social networking features such as:

* User management
* Post creation and management
* Like and unlike functionality
* Comment management
* Notifications
* User-to-user chat
* Media/file upload
* Service discovery
* API Gateway routing
* PostgreSQL data persistence
* React-based frontend

The application is divided into independent services so that each business functionality can be developed, maintained and scaled independently.

---

## Architecture

```text
                         React Frontend
                            :5173
                              |
                              v
                       API Gateway
                            :8080
                              |
          +-------------------+-------------------+
          |                   |                   |
          v                   v                   v
     User Service        Post Service       Like Service
        :8081                :8082              :8083
          |                   |                   |
          +-------------------+-------------------+
                              |
                              v
                       Comment Service
                            :8084
                              |
                +-------------+-------------+
                |                           |
                v                           v
       Notification Service             Chat Service
              :8085                       :8086
                                            |
                                            v
                                      Media Service
                                          :8087

                         Eureka Server
                             :8761
                              |
                              v
                         PostgreSQL
```

---

## Microservices

### 1. Service Discovery

**Port:** `8761`

Technology:

* Spring Cloud Netflix Eureka

Responsibilities:

* Service registration
* Service discovery
* Maintaining registered service information

---

### 2. API Gateway

**Port:** `8080`

Technology:

* Spring Cloud Gateway

Responsibilities:

* Central entry point for frontend requests
* Request routing
* Communication between frontend and backend services

Example routes:

```text
/api/users/**
/api/posts/**
/api/likes/**
/api/comments/**
/api/notifications/**
/api/messages/**
/api/media/**
```

---

### 3. User Service

**Port:** `8081`

Responsibilities:

* Create users
* Get all users
* Get user by ID
* Delete users

Main fields:

```text
id
name
email
```

---

### 4. Post Service

**Port:** `8082`

Responsibilities:

* Create posts
* Get all posts
* Get post by ID
* Get posts by user
* Delete posts

Main fields:

```text
id
userId
content
```

The Post Service also validates the user through the User Service before creating a post.

---

### 5. Like Service

**Port:** `8083`

Responsibilities:

* Like a post
* Get likes for a post
* Get like by ID
* Remove a like
* Prevent duplicate likes

Main fields:

```text
id
userId
postId
```

---

### 6. Comment Service

**Port:** `8084`

Responsibilities:

* Create comments
* Get comments by post
* Get comments by user
* Get comment by ID
* Delete comments

Main fields:

```text
id
userId
postId
content
```

---

### 7. Notification Service

**Port:** `8085`

Responsibilities:

* Create notifications
* Get notifications for a user
* Maintain notification read/unread status

Example:

```text
User 1 liked your post
You have a new comment on your post
```

---

### 8. Chat Service

**Port:** `8086`

Responsibilities:

* Send messages
* Store messages
* Retrieve messages for users

The React frontend provides a dedicated Chat interface.

---

### 9. Media Service

**Port:** `8087`

Responsibilities:

* Handle file uploads
* Receive multipart file requests
* Provide media functionality for the social platform

---

# Frontend

The frontend is developed using **React and Vite**.

**Frontend Port:** `5173`

Main sections:

* Home
* Users
* Chat
* Notifications
* Media

## Frontend Features

### Home

* View posts
* Create posts
* Like posts
* Add comments
* View comments

### Users

* Display registered users

### Chat

* Select receiver
* Send messages
* View messages

### Notifications

* Display user notifications
* Show read/unread status

### Media

* Select a file
* Upload file
* Display upload status

---

# Technology Stack

| Technology            | Purpose                             |
| --------------------- | ----------------------------------- |
| Java 21               | Backend development                 |
| Spring Boot 4.0.7     | Microservices                       |
| Spring Cloud 2025.1.2 | Microservices infrastructure        |
| Spring Cloud Gateway  | API Gateway                         |
| Eureka                | Service Discovery                   |
| Spring Data JPA       | Database access                     |
| Hibernate             | ORM                                 |
| PostgreSQL            | Database                            |
| React                 | Frontend                            |
| Vite                  | Frontend build tool                 |
| JavaScript            | Frontend development                |
| Maven                 | Backend build/dependency management |
| REST API              | Service communication               |
| Postman               | API testing                         |

---

# Database

The project uses PostgreSQL.

Database name:

```text
social_media_db
```

Database configuration:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/social_media_db
spring.datasource.username=postgres
spring.datasource.password=postgres
```

The application uses Spring Data JPA and Hibernate for database persistence.

---

# API Endpoints

## User APIs

```text
GET    /api/users
GET    /api/users/{id}
POST   /api/users
DELETE /api/users/{id}
```

Example:

```json
{
  "name": "Mangesh",
  "email": "mangesh@example.com"
}
```

---

## Post APIs

```text
GET    /api/posts
GET    /api/posts/{id}
GET    /api/posts/user/{userId}
POST   /api/posts
DELETE /api/posts/{id}
```

Example:

```json
{
  "userId": 1,
  "content": "Hello from Social Media Platform!"
}
```

---

## Like APIs

```text
POST   /api/likes
GET    /api/likes/{id}
GET    /api/likes/post/{postId}
DELETE /api/likes/{id}
```

Example:

```json
{
  "userId": 1,
  "postId": 2
}
```

---

## Comment APIs

```text
POST   /api/comments
GET    /api/comments/{id}
GET    /api/comments/post/{postId}
GET    /api/comments/user/{userId}
DELETE /api/comments/{id}
```

Example:

```json
{
  "userId": 1,
  "postId": 2,
  "content": "Great post!"
}
```

---

## Notification APIs

```text
POST /api/notifications
GET  /api/notifications/user/{userId}
```

---

## Chat APIs

```text
POST /api/messages
GET  /api/messages/user/{userId}
```

Example:

```json
{
  "senderId": 1,
  "receiverId": 2,
  "message": "Hello!"
}
```

---

## Media API

```text
POST /api/media/upload
```

The endpoint accepts a multipart file upload together with the user information.

---

# Project Structure

```text
social-media-platform/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── api-gateway/
│
├── service-discovery/
│
├── user-service/
│
├── post-service/
│
├── like-service/
│
├── comment-service/
│
├── notification-service/
│
├── chat-service/
│
├── media-service/
│
├── README.md
└── .gitignore
```

---

# Requirements

Before running the project, install:

* Java 21
* Maven
* PostgreSQL
* Node.js
* npm
* IntelliJ IDEA or another Java IDE
* Git

---

# Database Setup

Create the PostgreSQL database:

```sql
CREATE DATABASE social_media_db;
```

Make sure PostgreSQL is running before starting the backend services.

---

# How to Run the Backend

Start the services in the following order.

### 1. Start Service Discovery

```text
service-discovery
Port: 8761
```

### 2. Start API Gateway

```text
api-gateway
Port: 8080
```

### 3. Start Business Services

```text
user-service          :8081
post-service          :8082
like-service          :8083
comment-service       :8084
notification-service  :8085
chat-service          :8086
media-service         :8087
```

Open the Eureka dashboard:

```text
http://localhost:8761
```

Verify that the services are registered.

---

# How to Run the Frontend

Open a terminal inside the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

The React application will be available at:

```text
http://localhost:5173
```

---

# Testing

The application has been tested using the React frontend and REST APIs.

Tested functionality includes:

* User creation
* User retrieval
* Post creation
* Post retrieval
* Like functionality
* Duplicate like prevention
* Comment creation
* Comment retrieval
* Comment deletion
* Notification functionality
* Chat service
* Media upload
* API Gateway routing
* Eureka service registration
* PostgreSQL persistence

---

# Scalability

The microservices architecture allows individual services to be scaled independently.

For example, multiple instances of the Post Service can be deployed if post traffic increases.

Benefits:

* Independent scaling
* Service isolation
* Independent deployment
* Better resource utilization
* Easier maintenance

---

# Monitoring

Spring Boot Actuator can be used for application health and monitoring.

Important monitoring areas include:

* Service availability
* API response time
* Error rate
* Database connectivity
* JVM memory
* CPU usage
* Service registration

Future monitoring tools can include:

* Prometheus
* Grafana
* ELK Stack

---

# Future Enhancements

The following features can be added in future versions:

* JWT authentication
* Spring Security
* User registration/login
* Follow/friend system
* WebSocket-based real-time chat
* Redis caching
* Kafka or RabbitMQ messaging
* Docker Compose deployment
* Kubernetes deployment
* Cloud deployment
* Prometheus/Grafana monitoring
* Centralized logging
* Advanced search
* Recommendation system

---

# Screenshots

The project documentation contains screenshots of the following:

1. React Home Dashboard
2. Post Creation
3. Users Page
4. Like and Comment
5. Notifications
6. Chat
7. Media Upload
8. Eureka Dashboard
9. API Testing

---

# Author

**Mangesh Pathak**

Social Media Microservices Platform
Java | Spring Boot | Spring Cloud | React | PostgreSQL

---

# License

This project is developed for educational and project submission purposes.
