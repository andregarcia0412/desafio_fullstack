# <p align="center"> <span style="display: inline-flex; align-items: center; gap: 8px;"> <span style="font-size: 2rem; font-weight: 700;">[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=FiraCode&weight=600&size=32&pause=1000&color=FFFFFF&center=true&vCenter=true&width=435&lines=+LookUp)](https://git.io/typing-svg)</span> </span> </p>

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

LookUp is a web application designed to help users organize and visualize their personal expenses. After creating an account, users can access a personalized dashboard that displays their financial data through dynamic charts and categorized expense lists. The goal is to make tracking spending habits simple, intuitive, and visually engaging.

# Features
<ul>
  <li>User sign-up and login</li>
  <li>Dashboard with total expenses, transactions, and daily average</li>
  <li>Charts for expenses by category and over time</li>
  <li>List of recent expenses with edit/delete actions</li>
  <li>Add, edit, and remove expenses</li>
  <li>Clean UI with dark theme</li>
  <li>Mobile app where the user can easily add expenses</li>
</ul>

## Running Locally

This project includes a `docker-compose.yml` that starts the frontend, backend, and database with a single command.

### Prerequisites
- Docker installed  
- Docker Compose installed

## Environment Variables

Before running the project, make sure to configure the environment variables.

1. Duplicate the `.env.example` file:
   
   ```bash
   cp .env.example .env
3. Fill in the required values inside .env.


### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/andregarcia0412/LookUp
   cd LookUp
2. **Start all services**
   ```bash
   docker compose up -d
3. **Access the application**
<ul>
  <li>Frontend: <a href="http://localhost:8080">http://localhost:8080</a></li>
  <li>Backend API: <a href="http://localhost:3000">http://localhost:3000</a></li>
</ul>

## Running the Mobile App

The mobile app can be started using Expo.

### Prerequisites
- Node.js installed  
- Expo CLI (no global install required)  
- Android/iOS emulator or Expo Go on a physical device  

### Steps

1. **Install dependencies**
   ```bash
   npm install
2. **Start the Expo development server**
   ```bash
   npx expo start
3. **Run the app**
  - Scan the QR code with Expo Go on your phone

## Tech Stack
- Frontend: React + Vite
- Backend: NestJS
- Mobile: React Native + Expo
- Database: PostgreSQL
- Containerization: Docker & Docker Compose

## Live Access

### Web Version
You can access the live version of the web app here:  
**[https://lookup-finance.vercel.app/](https://lookup-finance.vercel.app/)**

### Android APK
Download the latest Android APK to use the mobile app:  
**https://github.com/andregarcia0412/LookUp/releases/download/v1.0.2/lookup.apk**


