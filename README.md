# CodeApp: High-Fidelity LeetCode Clone & Learning Platform

A premium, full-stack microservices-based coding platform designed for an exceptional learning and practice experience. Featuring real-time code execution, interactive learning roadmaps, and a state-of-the-art developer interface.

![Interactive Roadmap Demo](https://img.shields.io/badge/Architecture-Microservices-blue?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Frontend-React_19-61DAFB?style=for-the-badge&logo=react)
![Tech Stack](https://img.shields.io/badge/Backend-Spring_Boot-6DB33F?style=for-the-badge&logo=springboot)
![Database](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql)

## 🚀 Key Features

- **Interactive 10-Level Roadmaps**: Visualize your learning path with high-fidelity, interactive flowcharts (powered by React Flow).
- **Real-Time Code Execution**: Execute code in real-time within secure, sibling Docker containers (supporting multiple languages).
- **Service Discovery & API Gateway**: Robust microservices coordination using Netflix Eureka and Spring Cloud Gateway.
- **Modern Developer UI**: Premium dark mode experience with glassmorphism, Framer Motion animations, and Monaco Editor integration.
- **Problem Management**: Comprehensive problem set with categorizations, difficulty levels (Easy, Medium, Hard), and study materials.
- **Submission Tracking**: Real-time status updates for code submissions and progress tracking.

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 (TypeScript)
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand & TanStack React Query
- **UI Components**: Framer Motion (Animations), Lucide React (Icons), Recharts (Visualizations)
- **Editor**: Monaco Editor (`@monaco-editor/react`)
- **Visuals**: React Flow (`@xyflow/react`)

### Backend (Microservices)
- **Framework**: Java 17+ with Spring Boot
- **Services**:
    - `eureka-service`: Service registration and discovery (Port 8761)
    - `gateway-service`: Centralized API Gateway (Port 8080)
    - `auth-service`: JWT-based authentication and user management (Port 8081)
    - `problem-service`: Core problem set and metadata management (Port 8082)
    - `submission-service`: Submission handling and progress tracking (Port 8083)
    - `execution-service`: Docker-based code execution engine (Port 8084)
- **Build Tool**: Maven

### Infrastructure
- **Databases**: MySQL (Primary storage), Redis (Caching)
- **Messaging**: RabbitMQ (Asynchronous communication)
- **Containerization**: Docker & Docker Compose

## 📂 Project Structure

```text
CodeApp/
├── auth-service/        # JWT Authentication microservice
├── eureka-service/      # Netflix Eureka Discovery Server
├── execution-service/   # Docker-based code execution engine
├── gateway-service/     # Spring Cloud API Gateway
├── problem-service/     # Problem management microservice
├── submission-service/  # User submission tracking microservice
├── frontend/            # React 19 Frontend application
├── infrastructure/      # MySQL/RabbitMQ/Redis configuration
├── docker-compose.yml   # Platform orchestration
└── start_platform.sh    # Quick-launch script
```

## 🛠 Getting Started

### Prerequisites
- **Java 17+**
- **Node.js 18+** & npm
- **Maven**
- **Docker** (Desktop or CLI)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Eakhalaivan/CodeApp.git
   cd CodeApp
   ```

2. **Start Infrastructure (MySQL, RabbitMQ, Redis)**:
   ```bash
   docker-compose up -d mysql rabbitmq redis
   ```

3. **Launch the Platform**:
   You can use the provided script to start all services sequentially:
   ```bash
   chmod +x start_platform.sh
   ./start_platform.sh
   ```

   Alternatively, use Docker Compose to build and start the entire stack:
   ```bash
   docker-compose up --build
   ```

### Accessing the Platform
- **Frontend**: [http://localhost:5173](http://localhost:5173) (default dev port)
- **API Gateway**: [http://localhost:8080](http://localhost:8080)
- **Eureka Dashboard**: [http://localhost:8761](http://localhost:8761)

## 📡 Monitoring and Logs
Logs for each microservice are generated in the root directory:
- `eureka.log`, `gateway.log`, `auth.log`, `problem.log`, `submission.log`, `execution.log`, `frontend.log`

---
*Created with ❤️ for the Developer Community.*
