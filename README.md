# Pinecroft

> A social media platform for commercial investors to discuss, share, and track market insights in one place.

<p align="center">
  <img src="path/to/screenshot.png" alt="App screenshot" width="600" />
</p>

## Table of Contents

- [About](#about)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Demo](#demo)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Environment Variables](#environment-variables)  
  - [Running Locally](#running-locally)  
- [Folder Structure](#folder-structure)  
- [API Endpoints](#api-endpoints)  
- [Usage](#usage)  
- [Screenshots](#screenshots)  
- [Roadmap](#roadmap)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

---

## About

**Pinecroft** is a MERN‑stack application that blends social networking with financial market analysis.  
Users can join company‑specific communities, post insights, comment on market news, and view live stock data and charts—all in one social feed.

---

## Features

- **User Authentication** (JWT‑based signup/login)  
- **Social Feed**: create posts, comments, likes  
- **Communities**: join communities representing public companies  
- **Real‑Time Stock Data**: live price updates and historical charts  
- **Infinite Scroll / Pagination** on feeds  
- **Search**: users, communities, tickers    
- **Responsive UI** built with React (and Tailwind or your UI library)   

---

## Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (Atlas)  
- **Authentication:** JSON Web Tokens (JWT)  
- **Realtime/Data:** Socket.io (or WebSockets), Financial API (e.g. Alpha Vantage, IEX Cloud)  
- **Deployment:** Heroku / Vercel / Docker  

---

## Demo

[Live Site]() • [Video Walkthrough]()  

---

## Getting Started

### Prerequisites

- Node.js v14+  
- npm   
- MongoDB Atlas account (or local MongoDB)  
- API key for financial data provider  

### Installation

```bash
# Clone the repo
git clone https://github.com/VashishtBorkar/pinecroft.git
cd pinecroft

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root of your project and add:

```env
# MongoDB connection string
MONGO_URI=your_mongo_connection_string

# JWT secret for signing tokens
JWT_SECRET=your_jwt_secret

# API key for financial data provider
FIN_API_KEY=your_financial_api_key

# URL where your client is served (for CORS, redirects, etc.)
CLIENT_URL=http://localhost:3000
```


### Running Locally

```bash
# 1. Start the backend server
cd server
npm start

# 2. In a separate terminal, start the React client
cd client 
npm start
```


