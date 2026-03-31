# 🚀 CodeArena – High-Fidelity Coding platform

> A scalable, microservices-based coding platform with real-time execution and interactive learning roadmaps.

---

## 🧠 Overview

CodeArena is a full-stack coding platform inspired by LeetCode, built using modern frontend technologies and a distributed backend architecture. It focuses on real-world system design, scalability, and developer experience.

---

## 🏗️ Architecture Overview

The system is designed using a **microservices architecture**:

- **Auth Service** → Authentication & JWT handling  
- **Problem Service** → Coding problems & test cases  
- **Submission Service** → User submissions & history  
- **Execution Service** → Secure code execution (Docker-based)  
- **API Gateway** → Central request routing & filtering  
- **Eureka Server** → Service discovery  

### 🔄 Request Flow

Client → API Gateway → Microservice → Execution Engine → Response

---

## ⚙️ Tech Stack

### 🎨 Frontend
- React 19  
- Vite  
- Tailwind CSS 4  
- Monaco Editor  
- React Flow  
- Framer Motion  

### 🔧 Backend
- Java 17  
- Spring Boot  
- Spring Cloud (Gateway, Eureka)  
- Maven  

### 🏗️ Infrastructure
- MySQL  
- RabbitMQ  
- Redis  
- Docker  

---

## 🔥 Key Features

### 📚 Interactive Learning Roadmaps
- 10 structured levels (Beginner → Advanced)  
- Visual roadmap using React Flow  

### ⚡ Real-Time Code Execution
- Docker-based isolated execution  
- Async processing using RabbitMQ  

### 🌐 Scalable Architecture
- Service discovery via Eureka  
- API Gateway routing  
- Independent microservices  

### 🎨 Premium UI/UX
- Dark mode  
- Smooth animations (Framer Motion)  
- Monaco Editor integration  

---

## 🚀 Getting Started

### 📦 Prerequisites

- Java 17+
- Node.js 18+
- Docker & Docker Compose
- Maven

---

### 🔧 Installation

#### 1. Clone Repository
```bash
git clone https://github.com/your-username/codearena.git
cd codearena
2. Frontend Setup
cd frontend
npm install
npm run dev
3. Backend Setup
cd backend
mvn clean install
🐳 Run with Docker (Recommended)
docker-compose up --build
▶️ Manual Run
Start Eureka Server
Start API Gateway
Start all services:
Auth Service
Problem Service
Submission Service
Execution Service
Start Frontend
📁 Project Structure
codearena/
│
├── frontend/                 # React application
│
├── backend/
│   ├── auth-service/         
│   ├── problem-service/      
│   ├── submission-service/   
│   ├── execution-service/    
│   ├── api-gateway/          
│   └── eureka-server/        
│
├── docker/
├── docker-compose.yml
│
└── README.md
🧪 Future Improvements
Multi-language support (Java, Python, C++)
AI-based code suggestions
Contest & leaderboard system
WebSocket live execution updates
🤝 Contributing
Pull requests are welcome. Open an issue before making major changes.
📜 License
MIT License

---

### Straight truth:
If your actual project doesn’t implement **Docker execution + RabbitMQ + microservices properly**, this README will **overpromise and hurt you**.

If you want, I can upgrade this into:
- **GitHub profile-level README (badges + diagrams + screenshots)**
- **System design diagram (critical for interviews)**
- **Production-grade documentation (Swagger + API docs)**
