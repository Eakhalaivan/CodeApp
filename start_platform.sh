#!/bin/bash
# Aggressive kill of any processes on our ports
echo "Cleaning up ports 8761, 8080-8084, 5173..."
lsof -ti :8761,8080,8081,8082,8083,8084,5173 | xargs kill -9 2>/dev/null || true
sleep 2

# Eureka
echo "Starting Eureka (8761)..."
(cd eureka-service && mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xmx256m") > /Users/eakhalaivan/CodeApp/eureka.log 2>&1 &
sleep 20

# Gateway
echo "Starting Gateway (8080)..."
(cd gateway-service && mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xmx256m") > /Users/eakhalaivan/CodeApp/gateway.log 2>&1 &
sleep 20

# Auth
echo "Starting Auth (8081)..."
(cd auth-service && mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xmx256m") > /Users/eakhalaivan/CodeApp/auth.log 2>&1 &
sleep 15

# Problem
echo "Starting Problem (8082)..."
(cd problem-service && mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xmx384m") > /Users/eakhalaivan/CodeApp/problem.log 2>&1 &
sleep 15

# Submission
echo "Starting Submission (8083)..."
(cd submission-service && mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xmx256m") > /Users/eakhalaivan/CodeApp/submission.log 2>&1 &
sleep 15

# Execution
echo "Starting Execution (8084)..."
(cd execution-service && mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xmx256m") > /Users/eakhalaivan/CodeApp/execution.log 2>&1 &
sleep 15

# Frontend
echo "Starting Frontend (5173)..."
(cd frontend && npm run dev) > /Users/eakhalaivan/CodeApp/frontend.log 2>&1 &

echo "Platform is launching. Logs are in *.log files."
echo "Access at http://localhost:5173"
