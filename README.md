# Social Media Microservices Platform

## Project Overview

Social Media Microservices Platform is a backend application developed using Java and Spring Boot.

The project follows a Microservices Architecture where different features are separated into independent services.

The application provides functionality for:

- User Management
- Post Management
- Like Management
- Comment Management
- Service Discovery
- API Gateway

---

## Architecture

```text
                         ┌─────────────────────┐
                         │     API Gateway     │
                         │       :8080         │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
      │ User Service │      │ Post Service │      │ Like Service │
      │    :8081     │      │    :8082     │      │    :8083     │
      └──────────────┘      └──────────────┘      └──────────────┘
              │                     │                     │
              └─────────────────────┼─────────────────────┘
                                    │
                                    ▼
                           ┌──────────────────┐
                           │ Comment Service  │
                           │      :8084       │
                           └────────┬─────────┘
                                    │
                                    ▼
                           ┌──────────────────┐
                           │    PostgreSQL    │
                           │ social_media_db  │
                           └──────────────────┘

                     ┌──────────────────────┐
                     │   Eureka Server      │
                     │      :8761           │
                     │ Service Discovery    │
                     └──────────────────────┘
Microservices
1. Service Discovery

Service: service-discovery

Port: 8761

Technology:

Netflix Eureka Server

Purpose:

Registers microservices
Provides service discovery
Allows services to communicate using service names
2. API Gateway

Service: api-gateway

Port: 8080

Purpose:

Single entry point for client requests
Routes requests to appropriate microservices
Uses Eureka service discovery

Routes:

/api/users/**     → USER-SERVICE
/api/posts/**     → POST-SERVICE
/api/likes/**     → LIKE-SERVICE
/api/comments/**  → COMMENT-SERVICE
3. User Service

Service: user-service

Port: 8081

Responsibilities:

Create users
Retrieve users
Retrieve user by ID
Delete users

Endpoints:

GET     /api/users
GET     /api/users/{id}
POST    /api/users
DELETE  /api/users/{id}
4. Post Service

Service: post-service

Port: 8082

Responsibilities:

Create posts
Retrieve posts
Retrieve post by ID
Retrieve posts by user
Delete posts

Endpoints:

GET     /api/posts
GET     /api/posts/{id}
GET     /api/posts/user/{userId}
POST    /api/posts
DELETE  /api/posts/{id}
5. Like Service

Service: like-service

Port: 8083

Responsibilities:

Like posts
Retrieve likes for a post
Retrieve individual likes
Remove likes
Prevent duplicate likes from the same user on the same post

Endpoints:

POST    /api/likes
GET     /api/likes/{id}
GET     /api/likes/post/{postId}
DELETE  /api/likes/{id}

Example:

{
  "userId": 1,
  "postId": 2
}
6. Comment Service

Service: comment-service

Port: 8084

Responsibilities:

Create comments
Retrieve comments
Retrieve comments by post
Retrieve comments by user
Delete comments

Endpoints:

POST    /api/comments
GET     /api/comments/{id}
GET     /api/comments/post/{postId}
GET     /api/comments/user/{userId}
DELETE  /api/comments/{id}

Example:

{
  "userId": 1,
  "postId": 2,
  "content": "Nice post!"
}
Technologies Used
Java 21
Spring Boot
Spring Cloud
Spring Web MVC
Spring Data JPA
Spring Cloud Netflix Eureka
Spring Cloud API Gateway
PostgreSQL
Maven
Postman
IntelliJ IDEA
Database

Database:

social_media_db

Database:

PostgreSQL

Username:

postgres

The application uses Spring Data JPA and Hibernate for database operations.

Main entities include:

User
Post
Like
Comment
Configuration
Eureka Server
http://localhost:8761
API Gateway
http://localhost:8080
User Service
http://localhost:8081
Post Service
http://localhost:8082
Like Service
http://localhost:8083
Comment Service
http://localhost:8084
How to Run the Project

Start the services in the following order:

Step 1

Start:

service-discovery

Verify:

http://localhost:8761
Step 2

Start:

user-service

Port:

8081
Step 3

Start:

post-service

Port:

8082
Step 4

Start:

like-service

Port:

8083
Step 5

Start:

comment-service

Port:

8084
Step 6

Start:

api-gateway

Port:

8080

All client requests should preferably be sent through the API Gateway.

Example API Flow
Create User
POST http://localhost:8080/api/users
{
  "name": "Mangesh",
  "email": "mangesh@gmail.com"
}
Create Post
POST http://localhost:8080/api/posts
{
  "userId": 1,
  "content": "My first social media post"
}
Like Post
POST http://localhost:8080/api/likes
{
  "userId": 1,
  "postId": 1
}
Comment on Post
POST http://localhost:8080/api/comments
{
  "userId": 1,
  "postId": 1,
  "content": "Nice post!"
}
Testing

The APIs were tested using Postman.

Tested functionality:

User creation
User retrieval
User deletion
Post creation
Post retrieval
Posts by user
Like creation
Like retrieval
Duplicate like prevention
Like deletion
Comment creation
Comments by post
Comments by user
Comment deletion
API Gateway routing
Eureka service registration
PostgreSQL database operations
Project Features
Microservices Architecture
Service Discovery using Eureka
Centralized API Gateway
RESTful APIs
PostgreSQL Database
Spring Data JPA
Independent services
CRUD operations
Like management
Comment management
Duplicate like prevention
Service registration and discovery
Project Structure
social-media-platform/
│
├── api-gateway/
│
├── comment-service/
│
├── like-service/
│
├── post-service/
│
├── service-discovery/
│
├── user-service/
│
└── README.md
Future Enhancements

The project can be extended with:

JWT Authentication
User Login and Registration
Follow/Unfollow functionality
Notifications
Image/File Upload
Frontend application
Search functionality
Pagination
Docker containerization
Centralized logging
Distributed tracing
Author

Mangesh Pathak

Social Media Microservices Platform

Built using Java, Spring Boot, Spring Cloud and PostgreSQL.